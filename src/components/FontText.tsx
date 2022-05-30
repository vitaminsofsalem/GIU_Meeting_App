import React from "react";
import { TextProps, Text } from "react-native";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

interface FontTextProps extends TextProps {
  type?:
    | "thin"
    | "extra_light"
    | "light"
    | "regular"
    | "medium"
    | "semi_bold"
    | "bold"
    | "extra_bold"
    | "black";
  italic?: boolean;
}

export default function FontText({
  type = "regular",
  ...props
}: FontTextProps) {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  let selectedFont = "Poppins_400Regular";
  switch (type) {
    case "thin":
      selectedFont = props.italic
        ? "Poppins_100Thin_Italic"
        : "Poppins_100Thin";
      break;
    case "extra_light":
      selectedFont = props.italic
        ? "Poppins_200ExtraLight_Italic"
        : "Poppins_200ExtraLight";
      break;
    case "light":
      selectedFont = props.italic
        ? "Poppins_300Light_Italic"
        : "Poppins_300Light";
      break;
    case "regular":
      selectedFont = props.italic
        ? "Poppins_400Regular_Italic"
        : "Poppins_400Regular";
      break;
    case "medium":
      selectedFont = props.italic
        ? "Poppins_500Medium_Italic"
        : "Poppins_500Medium";
      break;
    case "semi_bold":
      selectedFont = props.italic
        ? "Poppins_600SemiBold_Italic"
        : "Poppins_600SemiBold";
      break;
    case "bold":
      selectedFont = props.italic
        ? "Poppins_700Bold_Italic"
        : "Poppins_700Bold";
      break;
    case "extra_bold":
      selectedFont = props.italic
        ? "Poppins_800ExtraBold_Italic"
        : "Poppins_800ExtraBold";
      break;
    case "black":
      selectedFont = props.italic
        ? "Poppins_900Black_Italic"
        : "Poppins_900Black";
      break;
  }

  return (
    <Text
      {...props}
      style={[
        props.style,
        fontsLoaded ? { fontFamily: selectedFont } : {},
        { paddingTop: 1.5 }, //To adjust uneven baseline of font
      ]}
    />
  );
}
