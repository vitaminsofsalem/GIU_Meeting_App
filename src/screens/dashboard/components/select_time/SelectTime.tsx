import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { TimePickerModal } from "react-native-paper-dates";
import { CustomButton } from "../../../../components/CustomButton";
import FontText from "../../../../components/FontText";
import { MAIN_BLUE } from "../../../../util/Colors";
import { BottomContainer } from "../BottomContainer";

interface SelectTimeProps {
  selectedTimeHour?: number;
  selectedTimeMin?: number;
  selectedActivity: string;
  onSelectedTimeChange: (hours: number, minutes: number) => void;
  onSelectedActivityChange: (activity: string) => void;
}

export default function SelectTime(props: SelectTimeProps) {
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const onSelectTimePress = () => {
    setTimePickerVisible(true);
  };

  const onSelectTimeDismiss = () => {
    setTimePickerVisible(false);
  };

  const onTimeSelected = (hours: number, minutes: number) => {
    props.onSelectedTimeChange(hours, minutes);
    setTimePickerVisible(false);
  };

  const currentTime = `${props.selectedTimeHour}:${
    props.selectedTimeMin! <= 9
      ? "0" + props.selectedTimeMin
      : props.selectedTimeMin
  }`;

  return (
    <>
      <BottomContainer>
        <View style={styles.mainContainer}>
          <FontText type="medium" style={styles.title}>
            Select free time
          </FontText>
          <View style={[styles.selectionContainer, { marginTop: 0 }]}>
            <FontText type="light" style={styles.selectionTitle}>
              Free Until
            </FontText>
            <Ripple
              rippleColor="white"
              onPress={onSelectTimePress}
              style={styles.selectionValueContainer}
            >
              <FontText type="light" style={styles.selectionValueText}>
                {props.selectedTimeHour !== undefined ? currentTime : "Select"}
              </FontText>
              <View style={styles.timeIconContainer}>
                <Image
                  style={styles.timeIcon}
                  source={require("../../../../../assets/icon_time.png")}
                />
              </View>
            </Ripple>
          </View>
          <View style={styles.selectionContainer}>
            <FontText type="light" style={styles.selectionTitle}>
              Activity
            </FontText>
            <Ripple rippleColor="white" style={styles.selectionValueContainer}>
              <FontText type="light" style={styles.selectionValueText}>
                {props.selectedActivity || "Select"}
              </FontText>
              <Image
                style={styles.bottomArrowIcon}
                source={require("../../../../../assets/icon_arrow_down.png")}
              />
            </Ripple>
          </View>
          <View style={styles.botttom}>
            <Ripple
              style={[
                styles.selectionValueContainer,
                {
                  height: 40,
                  width: 40,
                  marginTop: 0,
                  justifyContent: "center",
                },
              ]}
              rippleColor="white"
            >
              <Image
                style={styles.backArrowIcon}
                source={require("../../../../../assets/icon_arrow_back.png")}
              />
            </Ripple>
            <View style={{ width: 20 }} />
            <CustomButton
              style={styles.continueButton}
              onPress={() => {}}
              enabled={true}
            >
              Request Booking
            </CustomButton>
          </View>
        </View>
      </BottomContainer>

      <TimePickerModal
        visible={timePickerVisible}
        onDismiss={onSelectTimeDismiss}
        onConfirm={({ hours, minutes }) => {
          onTimeSelected(hours, minutes);
        }}
        label="Free until"
        uppercase={false}
        cancelLabel="Cancel"
        confirmLabel="Select"
        animationType="fade"
        locale="en"
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    color: "black",
  },
  selectionContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 15,
  },
  selectionTitle: {
    color: "#C4C4C4",
    fontSize: 13,
  },
  selectionValueContainer: {
    padding: 8,
    backgroundColor: MAIN_BLUE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    borderRadius: 5,
    marginTop: 3,
  },
  selectionValueText: {
    color: "white",
    fontSize: 14,
  },
  timeIconContainer: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 2,
    borderRadius: 5,
    marginStart: 10,
  },
  timeIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  bottomArrowIcon: {
    width: 11,
    height: 11,
    resizeMode: "contain",
    marginStart: 10,
  },
  backArrowIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  botttom: {
    alignSelf: "stretch",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  continueButton: { flex: 1, height: 40 },
});
