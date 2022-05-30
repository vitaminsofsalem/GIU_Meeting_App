import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import MapView from "../../components/map/MapView";
import { MapLocation, MAP_LOCATIONS } from "../../model/MapLocation";
import { BottomContainer } from "./components/BottomContainer";
import { SelectLocation } from "./components/select_location/SelectLocation";

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState<
    MapLocation | undefined
  >(undefined);

  return (
    <View style={styles.container}>
      <MapView
        allLocations={MAP_LOCATIONS}
        onLocationSelected={setSelectedLocation}
        selectedLocation={selectedLocation}
      />

      <SelectLocation
        allLocations={MAP_LOCATIONS}
        onLocationSelected={setSelectedLocation}
        selectedLocation={selectedLocation}
      />
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
