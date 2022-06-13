import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MeetPeople from "../screens/signup/Interests";
import MakeFriends from "../screens/signup/UploadPhoto";
import Dashboard from "../screens/dashboard/Dashboard";
import SignupPage from "../screens/signup/SignupPage";
import UploadPhoto from "../screens/signup/UploadPhoto";
import Interests from "../screens/signup/Interests";
import Login from "../screens/login/Login";
import WelcomeBack from "../screens/login/WelcomeBack";

//Incase a page accepts some paramter from navigation, add them here
export type ParamList = {
  Signup: undefined;
  UploadPhoto: undefined;
  Interests: undefined;
  Login: undefined;
  WelcomeBack: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<ParamList>();

export default function Stacknav() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Signup" component={SignupPage} />
      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
      <Stack.Screen name="Interests" component={Interests} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="WelcomeBack" component={WelcomeBack} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
