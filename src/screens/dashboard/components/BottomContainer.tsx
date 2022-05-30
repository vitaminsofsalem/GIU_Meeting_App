import { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export function BottomContainer(props: ViewProps) {
  return <View {...props} style={[styles.container, props.style]} />;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 10,
    left: 10,
    padding: 20,
    backgroundColor: "#FDFDFD",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
