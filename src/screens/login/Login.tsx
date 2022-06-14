import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Link, useNavigation } from "@react-navigation/native";
import { ServiceFactory } from "../../service/ServiceFactory";
import { UseCaseFactory } from "../../service/UseCaseFactory";
import FontText from "../../components/FontText";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamList } from "../../navigation/Stacknav";
import Toast from "react-native-toast-message";
import { CustomButton } from "../../components/CustomButton";

export default function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<StackNavigationProp<ParamList, "Login">>();
  const [isLoading, setIsLoading] = useState(false);

  const userUseCase = UseCaseFactory.getUserUseCase();

  const onLoginClick = () => {
    setIsLoading(true);
    userUseCase
      .logIn(email, password)
      .then(() => {
        navigation.replace("Dashboard");
      })
      .catch((e: Error) => {
        setIsLoading(false);
        if (e.message.includes("user-not-found")) {
          Toast.show({
            type: "error",
            text1: "User does not exists",
          });
        } else if (e.message.includes("wrong-password")) {
          Toast.show({
            type: "error",
            text1: "Incorrect password",
          });
        } else {
          Toast.show({
            type: "error",
            text1: "An error occured while signing in, please try again",
          });
        }
      });
  };

  useEffect(() => {
    userUseCase
      .getCurrentUser()
      .then((user) => {
        navigation.replace("Dashboard");
      })
      .catch(() => {
        //Should give error if not logged in
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <FontText style={styles.topLightText}>Hey there,</FontText>
        <FontText style={styles.topBoldText}>Welcome Back</FontText>
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.inputView}>
          <TextInput
            style={[styles.inputField, styles.inputShadow]}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={[styles.inputField, styles.inputShadow]}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
        </View>
        <View style={{ top: 5 }}></View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.btnContainer}>
          <CustomButton
            enabled={!isLoading && email.length >= 2 && password.length >= 2}
            onPress={onLoginClick}
          >
            Login
          </CustomButton>
          <View style={styles.divider}>
            <View style={styles.line} />
            <View>
              <FontText style={{ fontWeight: "400" }}> Or </FontText>
            </View>
            <View style={styles.line} />
          </View>
          <FontText style={styles.bottomText}>
            Don't have an account yet?{" "}
            <FontText
              style={{ textDecorationLine: "underline", color: "#7BD5D8" }}
            >
              <Link to={{ screen: "Signup" }}>Register</Link>
            </FontText>
          </FontText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  topContainer: {
    minHeight: "20%",
    maxHeight: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  topLightText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
  },
  topBoldText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 30,
  },
  inputGroup: {
    minHeight: "50%",
    maxHeight: "25%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  inputView: {
    padding: 7,
  },
  inputField: {
    minWidth: "80%",
    padding: 15,
    borderRadius: 15,
    height: 48,
    width: "80%",
    backgroundColor: "#F7F8F8",
  },
  bottomContainer: {
    minHeight: "28%",
    maxHeight: "25%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    top: "5%",
    borderRadius: 40,
  },
  btn: {
    minHeight: 60,
    minWidth: 315,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#7BD5D8",
  },
  btnText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 16,
    color: "white",
    lineHeight: 24,
  },

  shadow: {
    shadowColor: "#7BD5D8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  inputShadow: {
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    elevation: 3,
  },
  divider: {
    display: "flex",
    flexDirection: "row",
    top: 15,
  },
  line: {
    width: 130,
    height: 1,
    top: 10,
    backgroundColor: "#DDDADA",
  },

  bottomText: {
    top: "50%",
    textAlign: "center",
  },
});
