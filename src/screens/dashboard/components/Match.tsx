import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import FontText from "../../../components/FontText";
import { MAIN_BLUE } from "../../../util/Colors";
import { BottomContainer } from "./BottomContainer";

interface MatchProps {
  isFinalMatch: boolean;
  onAcceptPress: () => void;
  onDeclinePress: () => void;
  onFinishPress: () => void;
}

export default function Match(props: MatchProps) {
  return (
    <BottomContainer>
      <View style={styles.mainContainer}>
        <FontText style={styles.matchFoundTitle}>Match Found</FontText>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={require("../../../../assets/celebrity-scarlet.jpg")}
          />
        </View>
        <FontText type="light" style={styles.profileTitle}>
          Emilia Clark
        </FontText>

        {props.isFinalMatch && (
          <FontText type="light" style={styles.profileTitle}>
            Please meet Emilia at{" "}
            <FontText type="light" style={{ color: MAIN_BLUE }}>
              Platform
            </FontText>
          </FontText>
        )}
        <View style={styles.bottomContainer}>
          {props.isFinalMatch ? (
            <CustomButton
              style={[styles.button, { width: 250 }]}
              onPress={props.onFinishPress}
            >
              I arrived and met Emilia
            </CustomButton>
          ) : (
            <>
              <CustomButton
                style={styles.button}
                onPress={props.onDeclinePress}
                color="#DA6060"
              >
                Decline
              </CustomButton>
              <CustomButton style={styles.button} onPress={props.onAcceptPress}>
                Accept
              </CustomButton>
            </>
          )}
        </View>
      </View>
    </BottomContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
  },

  matchFoundTitle: {
    color: "black",
    fontSize: 22,
  },

  profileImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    marginTop: 10,
  },

  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  profileTitle: {
    color: "black",
    fontSize: 14,
    marginTop: 10,
  },

  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
    marginTop: 10,
  },
  button: {
    width: 150,
  },
});
