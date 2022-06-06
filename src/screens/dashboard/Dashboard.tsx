import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView from "../../components/map/MapView";
import { MapLocation, MAP_LOCATIONS } from "../../model/MapLocation";
import { BottomContainer } from "./components/BottomContainer";
import { SelectLocation } from "./components/select_location/SelectLocation";
import SelectTime from "./components/select_time/SelectTime";

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<
    MapLocation | undefined
  >(undefined);
  const [selectedTimeHour, setSelectedTimeHour] = useState<number | undefined>(
    undefined
  );
  const [selectedTimeMin, setSelectedTimeMin] = useState<number | undefined>(
    undefined
  );
  const [selectedActivity, setSelectedActivity] = useState("");

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
          onContinueClick={() => setCurrentStep(1)}
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
