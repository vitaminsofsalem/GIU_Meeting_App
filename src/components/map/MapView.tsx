import React from "react";
import { View } from "react-native";
import RenderedMap from "./RenderedMap";

export default function MapView() {
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "#f1f3f4" }}>
      <RenderedMap />
    </View>
  );
}
