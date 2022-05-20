import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/onboarding/Onboarding";
import MeetPeople from "../screens/onboarding/MeetPeople";
import MakeFriends from "../screens/onboarding/MakeFriends";

const Stack = createStackNavigator();

export default function Stacknav() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="MeetPeople" component={MeetPeople} />
      <Stack.Screen name="MakeFriends" component={MakeFriends} />
    </Stack.Navigator>
  );
}
