import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView from "../../components/map/MapView";
import { MapLocation, MAP_LOCATIONS } from "../../model/MapLocation";
import { BottomContainer } from "./components/BottomContainer";
import { SelectLocation } from "./components/select_location/SelectLocation";
import SelectTime from "./components/select_time/SelectTime";
import WaitingForMatch from "./components/WaitingForMatch";
import Match from "./components/Match";

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<
    MapLocation | undefined
  >(undefined);
  const [selectedTimeHour, setSelectedTimeHour] = useState<
    number | undefined
  >();
  const [selectedTimeMin, setSelectedTimeMin] = useState<number | undefined>();
  const [selectedActivity, setSelectedActivity] = useState<
    string | undefined
  >();

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <View style={styles.container}>
      <MapView
        allLocations={MAP_LOCATIONS}
        onLocationSelected={setSelectedLocation}
        selectedLocation={selectedLocation}
      />

      {currentStep === 0 && (
        <SelectLocation
          allLocations={MAP_LOCATIONS}
          onLocationSelected={setSelectedLocation}
          selectedLocation={selectedLocation}
          onContinuePress={() => setCurrentStep(1)}
        />
      )}
      {currentStep === 1 && (
        <SelectTime
          onSelectedActivityChange={setSelectedActivity}
          onSelectedTimeChange={(hour, min) => {
            setSelectedTimeHour(hour);
            setSelectedTimeMin(min);
          }}
          selectedActivity={selectedActivity}
          selectedTimeHour={selectedTimeHour}
          selectedTimeMin={selectedTimeMin}
          onBackPress={() => setCurrentStep(currentStep - 1)}
          onRequestPress={() => setCurrentStep(2)}
        />
      )}
      {false && <WaitingForMatch onCancelPress={() => setCurrentStep(0)} />}

      {currentStep === 2 && (
        <Match
          onAcceptPress={() => {}}
          onDeclinePress={() => {}}
          onFinishPress={() => {}}
          isFinalMatch={true}
          matchedLocation="Platform"
          matchedUser={{
            email: "",
            firstName: "Emilia",
            lastName: "Clark",
            gender: "male",
            id: "21",
            intrests: [],
            meetUpHistory: [],
          }}
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
