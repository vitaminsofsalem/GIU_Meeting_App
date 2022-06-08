import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FontText from "../../components/FontText";

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <FontText type="black" style={styles.text}>
        Onboarding
      </FontText>
      <FontText>logo goes here 😺</FontText>
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
