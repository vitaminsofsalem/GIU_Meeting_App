import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { MapLocation } from "../../model/MapLocation";
import { MAIN_BLUE } from "../../util/Colors";
import FontText from "../FontText";

interface MarkersOverlayProps {
  onLocationSelected: (selected: MapLocation) => void;
  selectedLocation?: MapLocation;
  allLocations: MapLocation[];
  mapXPan: number;
  mapYPan: number;
}

export default function MarkersOverlay(props: MarkersOverlayProps) {
  const dimensions = useWindowDimensions();

  const heightOffsetAdjustment = dimensions.height * 0.17;
  const widthOffsetAdjustment = dimensions.width * 0.15;
  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.mainContainer,
        {
          transform: [
            { translateY: heightOffsetAdjustment + props.mapYPan * 30 },
            { translateX: widthOffsetAdjustment + props.mapXPan * 30 },
          ],
        },
      ]}
    >
      {props.allLocations.map((location) => (
        <Marker
          key={location.label}
          location={location}
          isSelected={(props.selectedLocation?.label || "") === location.label}
          onPress={() => {
            props.onLocationSelected(location);
          }}
        />
      ))}
    </View>
  );
}

interface MarkerProps {
  location: MapLocation;
  onPress: () => void;
  isSelected: boolean;
}

function Marker(props: MarkerProps) {
  return (
    <Ripple
      onPress={props.onPress}
      rippleContainerBorderRadius={styles.markerItem.borderRadius}
      rippleColor={props.isSelected ? "white" : MAIN_BLUE}
      style={[
        styles.markerItem,
        {
          left: props.location.mapLeftOffset,
          top: props.location.mapTopOffset,
        },
        props.isSelected ? styles.markerItemSelected : {},
      ]}
    >
      <FontText
        type={props.isSelected ? "bold" : "regular"}
        style={[
          styles.markerItemText,
          props.isSelected ? styles.markerItemTextSelected : {},
        ]}
      >
        {props.location.label}
      </FontText>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  markerItem: {
    backgroundColor: "white",
    height: 25,
    borderRadius: 12.5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderColor: MAIN_BLUE,
    borderWidth: 1,
  },
  markerItemSelected: {
    backgroundColor: MAIN_BLUE,
  },
  markerItemText: {
    fontSize: 10,
    color: "black",
    textAlign: "center",
  },
  markerItemTextSelected: {
    color: "white",
  },
});
