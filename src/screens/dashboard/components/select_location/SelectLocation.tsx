import { StyleSheet, View, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CustomButton } from "../../../../components/CustomButton";
import FontText from "../../../../components/FontText";
import { MapLocation } from "../../../../model/MapLocation";
import { BottomContainer } from "../BottomContainer";
import { LocationItem } from "./LocationItem";

interface SelectLocationProps {
  onLocationSelected: (selected: MapLocation) => void;
  selectedLocation?: MapLocation;
  allLocations: MapLocation[];
  onContinueClick: () => void;
}

export function SelectLocation(props: SelectLocationProps) {
  return (
    <BottomContainer style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <FontText style={styles.title} type="medium">
          Request meeting?
        </FontText>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={require("../../../../../assets/celebrity-scarlet.jpg")}
          />
        </View>
      </View>
      <FlatList
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 5,
          marginTop: 5,
        }}
        data={props.allLocations}
        renderItem={({ item: location }) => (
          <LocationItem
            key={location.label}
            isSelected={props.selectedLocation?.label === location.label}
            location={location}
            onPress={() => props.onLocationSelected(location)}
          />
        )}
        keyExtractor={(location) => location.label}
        horizontal
        ItemSeparatorComponent={() => <View style={{ paddingStart: 20 }} />}
        showsHorizontalScrollIndicator={false}
      />
      <CustomButton
        style={styles.continueButton}
        onPress={props.onContinueClick}
        enabled={!!props.selectedLocation}
      >
        Continue
      </CustomButton>
    </BottomContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 19,
    color: "black",
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  continueButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
});
