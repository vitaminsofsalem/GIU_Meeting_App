import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/onboarding/Onboarding";
import MeetPeople from "../screens/onboarding/MeetPeople";
import MakeFriends from "../screens/onboarding/MakeFriends";
import Dashboard from "../screens/dashboard/Dashboard";

//Incase a page accepts some paramter from navigation, add them here
export type ParamList = {
  Onboarding: undefined;
  MeetPeople: undefined;
  MakeFriends: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<ParamList>();

export default function Stacknav() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="MeetPeople" component={MeetPeople} />
      <Stack.Screen name="MakeFriends" component={MakeFriends} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
