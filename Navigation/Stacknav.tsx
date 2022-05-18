import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../Screens/Onboarding/Onboarding";
import MeetPeople from "../Screens/Onboarding/MeetPeople";
import MakeFriends from "../Screens/Onboarding/MakeFriends";

const Stack = createStackNavigator();

export default function Stacknav() {
  return (
    <Stack.Navigator
      initialRouteName="onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="MeetPeople" component={MeetPeople} />
      <Stack.Screen name="MakeFriends" component={MakeFriends} />
    </Stack.Navigator>
  );
}
