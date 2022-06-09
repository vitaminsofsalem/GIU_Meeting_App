import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView from "../../components/map/MapView";
import { MapLocation, MAP_LOCATIONS } from "../../model/MapLocation";
import { SelectLocation } from "./components/select_location/SelectLocation";
import SelectTime from "./components/SelectTime";
import WaitingForMatch from "./components/WaitingForMatch";
import Match from "./components/Match";
import { Match as MatchModel } from "../../model/Match";
import { UseCaseFactory } from "../../service/UseCaseFactory";
import { User } from "../../model/User";

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation>();
  const [locationSelected, setLocationSelected] = useState(false);
  const [selectedTimeHour, setSelectedTimeHour] = useState<number>();
  const [selectedTimeMin, setSelectedTimeMin] = useState<number>();
  const [selectedActivity, setSelectedActivity] = useState<string>();
  const [finalAcceptedMatchId, setFinalAcceptedMatchId] = useState<string>();
  const [currentMatch, setCurrentMatch] = useState<MatchModel>();
  const [unsubscribeMatches, setUnSubscribeMatches] = useState<() => void>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [isInRequest, setIsInRequest] = useState(false);
  const [shouldResetWhenDeleted, setShouldResetWhenDeleted] = useState(false);
  const matchedUser =
    currentMatch?.user1.id === currentUser?.id
      ? currentMatch?.user2
      : currentMatch?.user1;

  const matchUseCase = UseCaseFactory.getMatchUseCase();
  const userUseCase = UseCaseFactory.getUserUseCase();

  const createRequest = () => {
    const date = new Date(Date.now());
    date.setHours(selectedTimeHour!!, selectedTimeMin);

    matchUseCase.matchAndCreateRequest(
      selectedLocation!!.label,
      date.getTime(),
      selectedActivity!!
    );
    setIsInRequest(true);
  };

  const resetState = () => {
    setIsInRequest(false);
    setLocationSelected(false);
    setSelectedActivity(undefined);
    setSelectedTimeHour(undefined);
    setSelectedTimeMin(undefined);
    setShouldResetWhenDeleted(false);
    setFinalAcceptedMatchId(undefined);
    setCurrentMatch(undefined);
  };

  const cancelRequest = () => {
    matchUseCase.cancelRequest();
    resetState();
  };

  const subscribeToMatches = async () => {
    const unsubscribe = await matchUseCase.subscribeToMatch((match) => {
      setCurrentMatch(match);
    });
    setUnSubscribeMatches(() => () => unsubscribe());
  };

  const getCurrentuser = async () => {
    const user = await userUseCase.getCurrentUser();
    setCurrentUser(user);
  };

  const acceptMatch = () => {
    matchUseCase.acceptMatch(currentMatch!!.id);
  };

  const rejectMatch = () => {
    matchUseCase.rejectMatch(currentMatch!!.id);
  };

  const finishMeeting = () => {
    matchUseCase.finishMeeting(
      currentMatch ? currentMatch.id : finalAcceptedMatchId!!
    );
    resetState();
  };

  const onLocationSelected = (location: MapLocation) => {
    if (!locationSelected) {
      setSelectedLocation(location);
    }
  };

  // Cleanes up match subscribtion, since the unsubscribe result is asyncronous
  useEffect(() => {
    return unsubscribeMatches;
  }, [unsubscribeMatches]);

  useEffect(() => {
    getCurrentuser();
    subscribeToMatches();
  }, []);

  //Restores state if is in request
  useEffect(() => {
    if (currentUser && currentUser.currentRequest) {
      setIsInRequest(true);
    } else {
      setIsInRequest(false);
    }
  }, [currentUser]);

  //Handles reset back to normal state when a request is completed by either side
  useEffect(() => {
    if (
      !currentMatch ||
      !(
        currentMatch.user1Status === "accepted" &&
        currentMatch.user2Status === "accepted"
      )
    ) {
      if (shouldResetWhenDeleted) {
        resetState();
      }
    }
    if (currentMatch) {
      if (
        currentMatch.user1Status === "accepted" &&
        currentMatch.user2Status === "accepted"
      ) {
        setShouldResetWhenDeleted(true);
        setFinalAcceptedMatchId(currentMatch.id);
      }
    }
  }, [currentMatch]);

  //Set location based on match
  useEffect(() => {
    if (currentMatch && currentMatch.location) {
      setSelectedLocation(
        MAP_LOCATIONS.find((item) => item.label === currentMatch.location)
      );
    }
  }, [currentMatch]);

  return (
    <View style={styles.container}>
      <MapView
        allLocations={MAP_LOCATIONS}
        onLocationSelected={onLocationSelected}
        selectedLocation={selectedLocation}
      />

      {!isInRequest ? (
        !locationSelected ? (
          <SelectLocation
            allLocations={MAP_LOCATIONS}
            onLocationSelected={setSelectedLocation}
            selectedLocation={selectedLocation}
            onContinuePress={() => setLocationSelected(true)}
            userImage={currentUser?.photoUrl}
          />
        ) : (
          <SelectTime
            onSelectedActivityChange={setSelectedActivity}
            onSelectedTimeChange={(hour, min) => {
              setSelectedTimeHour(hour);
              setSelectedTimeMin(min);
            }}
            selectedActivity={selectedActivity}
            selectedTimeHour={selectedTimeHour}
            selectedTimeMin={selectedTimeMin}
            onBackPress={() => setLocationSelected(false)}
            onRequestPress={() => createRequest()}
          />
        )
      ) : currentMatch === undefined ? (
        <WaitingForMatch onCancelPress={() => cancelRequest()} />
      ) : (
        <Match
          onAcceptPress={acceptMatch}
          onDeclinePress={rejectMatch}
          onFinishPress={finishMeeting}
          isFinalMatch={
            currentMatch.user1Status === "accepted" &&
            currentMatch.user2Status === "accepted"
          }
          matchedLocation={currentMatch.location}
          matchedUser={matchedUser!!}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
