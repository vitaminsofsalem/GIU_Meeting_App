import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FontText from "../../components/FontText";
import MapView from "../../components/map/MapView";

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <MapView />
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
