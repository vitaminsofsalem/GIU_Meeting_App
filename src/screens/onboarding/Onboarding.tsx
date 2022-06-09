import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FontText from "../../components/FontText";
import { CustomButton } from "../../components/CustomButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ParamList } from "../../navigation/Stacknav";
import { UseCaseFactory } from "../../service/UseCaseFactory";

export default function Onboarding() {
  const userUseCase = UseCaseFactory.getUserUseCase();
  const navigation = useNavigation<NavigationProp<ParamList, "Onboarding">>();

  return (
    <View style={styles.container}>
      <FontText type="black" style={styles.text}>
        Onboarding
      </FontText>
      <FontText>logo goes here 😺</FontText>
      <CustomButton
        onPress={async () => {
          await userUseCase.logIn("email1@email.com", "1q2w3e4r");
          navigation.navigate("Dashboard");
        }}
      >
        Sample user 1
      </CustomButton>
      <CustomButton
        onPress={async () => {
          await userUseCase.logIn("email2@email.com", "1q2w3e4r");
          navigation.navigate("Dashboard");
        }}
      >
        Sample user 2
      </CustomButton>
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
