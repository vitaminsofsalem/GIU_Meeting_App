import React, { useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import RenderedMap from "./RenderedMap";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import MarkersOverlay from "./MarkersOverlay";
import { MapLocation } from "../../model/MapLocation";

interface MapViewProps {
  onLocationSelected: (selected: MapLocation) => void;
  selectedLocation?: MapLocation;
  allLocations: MapLocation[];
}

export default function MapView(props: MapViewProps) {
  const dimensions = useWindowDimensions();
  const [isPannable, setIsPannable] = useState(true);
  const [currentXPan, setCurrentXPan] = useState(0);
  const [currentYPan, setCurrentYPan] = useState(0);

  return (
    <ReactNativeZoomableView
      maxZoom={2}
      minZoom={0.7}
      zoomStep={0}
      initialZoom={1}
      onZoomAfter={(_: any, __: any, zoomableViewEventObject: any) => {
        const currentZoom: number = zoomableViewEventObject.zoomLevel;
        setIsPannable(currentZoom <= 1);
      }}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f1f3f4",
        position: "absolute",
      }}
    >
      <View
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <RenderedMap
          isPannable={isPannable}
          onMapXPan={setCurrentXPan}
          onMapYPan={setCurrentYPan}
        />
        <MarkersOverlay
          allLocations={props.allLocations}
          onLocationSelected={props.onLocationSelected}
          selectedLocation={props.selectedLocation}
          mapXPan={currentXPan}
          mapYPan={currentYPan}
        />
      </View>
    </ReactNativeZoomableView>
  );
}
