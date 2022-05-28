import React, { useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import RenderedMap from "./RenderedMap";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

export default function MapView() {
  const dimensions = useWindowDimensions();
  const [isPannable, setIsPannable] = useState(true);
  return (
    <ReactNativeZoomableView
      maxZoom={2}
      minZoom={0.7}
      zoomStep={0.5}
      initialZoom={1}
      onZoomAfter={(_: any, __: any, zoomableViewEventObject: any) => {
        const currentZoom: number = zoomableViewEventObject.zoomLevel;
        setIsPannable(currentZoom <= 1);
      }}
      style={{ flex: 1, backgroundColor: "#f1f3f4" }}
    >
      <View style={{ width: dimensions.width, height: dimensions.height }}>
        <RenderedMap isPannable={isPannable} />
      </View>
    </ReactNativeZoomableView>
  );
}
