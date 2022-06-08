import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { CustomButton } from "../../../components/CustomButton";
import FontText from "../../../components/FontText";
import { MAIN_BLUE } from "../../../util/Colors";
import { BottomContainer } from "./BottomContainer";

interface WaitingForMatchProps {
  onCancelPress: () => void;
}

export default function WaitingForMatch(props: WaitingForMatchProps) {
  return (
    <BottomContainer>
      <View style={styles.mainContainer}>
        <FontText type="light" style={styles.mainText}>
          Please wait while your request is processing.
        </FontText>
        <ActivityIndicator
          style={styles.acivityIndicator}
          color={MAIN_BLUE}
          size="large"
        />
        <FontText type="light" style={styles.mainText}>
          You will be notified when a match is found. This can take a while.
        </FontText>

        <CustomButton
          style={styles.button}
          onPress={props.onCancelPress}
          color="#DA6060"
        >
          Cancel Request
        </CustomButton>
      </View>
    </BottomContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    paddingHorizontal: 40,
  },

  acivityIndicator: {
    paddingVertical: 20,
  },

  mainText: {
    textAlign: "center",
    fontSize: 14,
    color: "black",
  },

  button: {
    marginTop: 20,
  },
});
