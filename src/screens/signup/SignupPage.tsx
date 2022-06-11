import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Link, useNavigation } from "@react-navigation/native";
import Login from "../login/Login";
import FirebaseAuth from "../../service/FirebaseAuth";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function SignupPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let name = firstName + " " + lastName;
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.topLightText}>Hey there,</Text>
        <Text style={styles.topBoldText}>Create an account</Text>
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.inputView}>
          <TextInput
            style={[styles.inputField, styles.inputShadow]}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={[styles.inputField, styles.inputShadow]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={[styles.inputField, styles.inputShadow]}
            placeholder="Gender"
            value={gender}
            onChangeText={(text) => setGender(text)}
          ></TextInput>
        </View>
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
        <View style={{ top: 5 }}>
          <BouncyCheckbox
            size={25}
            fillColor="#7BD5D8"
            text={
              "By continuing you accept our Privacy Policy and" +
              "\n" +
              "Terms of Use"
            }
            iconStyle={{ borderRadius: 5, borderColor: "#ADA4A5" }}
            textStyle={{
              fontSize: 12.5,
              textDecorationLine: "none",
              color: "#ADA4A5",
            }}
            onPress={(isChecked: boolean) => {}}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={async () => {
              (await FirebaseAuth.registerWithEmailAndPassword(
                email,
                password,
                name
              )) && navigation.navigate("Login");
            }}
            style={[styles.btn, styles.shadow]}
          >
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
          <View style={styles.divider}>
            <View style={styles.line} />
            <View>
              <Text style={{ fontWeight: "400" }}> Or </Text>
            </View>
            <View style={styles.line} />
          </View>
          <Text style={styles.bottomText}>
            Already have an account?{" "}
            <Text style={{ textDecorationLine: "underline", color: "#7BD5D8" }}>
              <Link to={{ screen: "Login" }}>Login</Link>
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    justifyContent: "center",
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
    border: "1px solid #F7F8F8",
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
    left: 16.5,
  },
  line: {
    width: 130,
    height: 1,
    top: 10,
    backgroundColor: "#DDDADA",
  },

  bottomText: {
    top: "50%",
    left: 55,
  },
});
