import { StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import FontText from "../../../../components/FontText";
import { MapLocation } from "../../../../model/MapLocation";
import { MAIN_BLUE } from "../../../../util/Colors";

interface LocationItemProps {
  location: MapLocation;
  isSelected: boolean;
  onPress: () => void;
}

export function LocationItem(props: LocationItemProps) {
  return (
    <Ripple
      onPress={props.onPress}
      rippleContainerBorderRadius={styles.mainContainer.borderRadius}
      rippleColor={props.isSelected ? "white" : MAIN_BLUE}
      style={[
        styles.mainContainer,
        props.isSelected ? styles.mainContainerSelected : {},
      ]}
    >
      <FontText style={styles.letter}>
        {props.location.label[0].toUpperCase()}
      </FontText>
      <FontText
        style={[styles.label, props.isSelected ? styles.labelSelected : {}]}
      >
        {props.location.label}
      </FontText>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: 113,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  mainContainerSelected: {
    backgroundColor: MAIN_BLUE,
  },
  letter: {
    color: "white",
    backgroundColor: "#D6D6D6",
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  label: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 14,
  },
  labelSelected: { color: "white" },
});
