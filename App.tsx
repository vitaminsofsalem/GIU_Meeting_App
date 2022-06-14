import { LogBox, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Stacknav from "./src/navigation/Stacknav";
import Toast from "react-native-toast-message";

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <>
      <NavigationContainer>
        <Stacknav />
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
