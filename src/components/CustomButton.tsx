import { ReactNode } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Ripple from "react-native-material-ripple";
import { MAIN_BLUE } from "../util/Colors";
import FontText from "./FontText";

interface ButtonProps {
  children: ReactNode;
  color?: string;
  rippleColor?: string;
  textColor?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  enabled?: boolean;
}

export function CustomButton({
  children,
  color = MAIN_BLUE,
  rippleColor = "white",
  textColor = "white",
  enabled = true,
  style,
  onPress,
}: ButtonProps) {
  return (
    <Ripple
      onPress={enabled ? onPress : undefined}
      style={[
        styles.mainButton,
        { backgroundColor: enabled ? color : "#EBEBE4" },
        style,
      ]}
      rippleContainerBorderRadius={styles.mainButton.borderRadius}
      rippleColor={enabled ? rippleColor : "#EBEBE4"}
    >
      <FontText style={[styles.text, { color: textColor }]}>
        {children}
      </FontText>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  mainButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
});
