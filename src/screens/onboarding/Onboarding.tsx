import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FontText from "../../components/FontText";
import MapView from "../../components/map/MapView";
import { MapLocation, MAP_LOCATIONS } from "../../model/MapLocation";

export default function Onboarding() {
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
      {/* <FontText type="black" style={styles.text}>
        Onboarding
      </FontText>
      <FontText>logo goes here 😺</FontText> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
  },
});
