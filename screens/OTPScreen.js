import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import * as Facebook from 'expo-facebook';
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
// PROVIDE VALID FIREBASE CONFIG HERE ads.nepcode@gmail.com
// https://firebase.google.com/docs/web/setup
const FIREBASE_CONFIG: any = {
  apiKey: "AIzaSyDNmb5CoJBogZt7DOmWL4JW2_8mQE9pE8Y",
  authDomain: "blood-app-63042.firebaseapp.com",
  projectId: "blood-app-63042",
  storageBucket: "blood-app-63042.appspot.com",
  messagingSenderId: "977447798412",
  appId: "1:977447798412:web:09d59d8eebc3850b0c9da9",
  measurementId: "G-V8ETYZKCR3",
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  // ignore app already initialized error on snack
}

export default function PhoneOtpScreen(props) {
  const recaptchaVerifier = React.useRef(null);
  const nameref1 = React.useRef(null);
  const nameref2 = React.useRef(null);
  const nameref3 = React.useRef(null);
  const nameref4 = React.useRef(null);
  const nameref5 = React.useRef(null);
  const nameref6 = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [pin1, setPin1] = React.useState("");
  const [pin2, setPin2] = React.useState("");
  const [pin3, setPin3] = React.useState("");
  const [pin4, setPin4] = React.useState("");
  const [pin5, setPin5] = React.useState("");
  const [sys1, setSys1] = React.useState("");

  const [pin6, setPin6] = React.useState("");

  const [verificationId, setVerificationId] = React.useState("");
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState("");
  const [confirmError, setConfirmError] = React.useState();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  const isConfigValid = !!FIREBASE_CONFIG.apiKey;
  const num = "+977" + phoneNumber;
  const gnum = props.route.params.cnum;
  const bloodgroup = props.route.params.bloodg;
  const dob = props.route.params.dob;
  const address = props.route.params.address;

  const name = props.route.params.name;
  const donor = props.route.params.donor;

  useEffect(() => {
    let o = Math.floor(Math.random() * 899999 + 100000);
    alert(o);
    async function otp() {
      if (gnum.length != 14) {
        alert("Error");
      } else {
        // const phoneProvider = new firebase.auth.PhoneAuthProvider();

        try {
          let o = Math.floor(Math.random() * 899999 + 100000);
          var url = "https://sms.aakashsms.com/sms/v3/send/";
          var data = {
            to: gnum.slice(4),
            auth_token:
              "b83027e50e5ebe14738201708e8488ded718f4f139a51dbdd255264af88db89d",
            text: " Hello User Your code is: " + o + " Regards Ragat Nepal",
          };
          console.log(data);
          fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              setVerifyInProgress(true);
              setVerificationId("");
              // const verificationId = await phoneProvider.verifyPhoneNumber(
              //   num,
              //   // @ts-ignore
              //   recaptchaVerifier.current
              // );
              setVerifyInProgress(false);
              setVerificationId(gnum);
              setSys1(gnum);
              setSpinner(false);
            })
            .catch((error) => {
              alert("Error" + error);
            });

          setVerifyError(undefined);
          setVerifyInProgress(true);
          setVerificationId("");
          // const verificationId = await phoneProvider.verifyPhoneNumber(
          //   gnum,
          //   // @ts-ignore
          //   recaptchaVerifier.current
          // );
          setVerifyInProgress(false);
          setVerificationId(gnum);
          nameref1.current?.focus();
        } catch (err) {
          alert(err);

          props.navigation.navigate("SignUp");
          setVerifyError(err);
          setVerifyInProgress(false);
        }
        //     await AsyncStorage.setItem('phoneNumber', phoneNumber);
        // navigation.navigate('otp')
      }
    }
    otp();
  }, []);

  async function insertRecord() {
    var url = "https://ragatnepal.com/api/signupapi.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      name: name,
      address: address,
      contact: gnum,
      group: bloodgroup,
      dob: dob,
      key: "5485FE5759545A4A",
      donor: donor,
    };
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        alert(response[0].message);
        if (response[0].errorstate == 0) {
          setandred();
        } else {
          props.navigation.navigate("Home", { screen: "Home" });
        }
      })
      .catch((error) => {
        alert("Error" + error);
      });
  }
  async function setandred() {
    await AsyncStorage.setItem("contact", gnum);
    props.navigation.navigate("Home", { screen: "Home" });
  }
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
      }}
      style={{
        flex: 1,
        flexDirection: "row",

        backgroundColor: "#efefef",
      }}
    >
      <View style={styles.container}>
        {/* <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
        /> */}
        <View style={styles.nav}>
          <Ionicons
            name="chevron-back"
            onPress={() => {
              props.navigation.navigate("SignUp");
            }}
            size={30}
            color="black"
            style={{ paddingLeft: 0 }}
          />
        </View>
        <View style={styles.body}>
          <Image style={styles.blood} source={require("../assets/blood.png")} />

          <Text style={{ fontSize: 30, paddingTop: 30, fontWeight: "bold" }}>
            Welcome Back!
          </Text>

          <Text style={{ color: "grey" }}>You are a real Hero</Text>

          <View style={styles.login}>
            {gnum ? (
              <View style={{ justifyContent: "center" }}>
                <Text style={{ color: "grey", textAlign: "center" }}>
                  We have sent an OTP to verify your {"\n"} Phone Number ({" "}
                  {gnum} )
                </Text>

                <View style={{ flexDirection: "column", flex: 1 }}>
                  <View style={{}}>
                    <View
                      style={{
                        flex: 1,
                        top: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextInput
                        keyboardType="numeric"
                        maxLength={1}
                        elevation={5}
                        ref={nameref1}
                        onChangeText={(value) => {
                          setPin1(value);
                          if (value.length == 1) {
                            nameref2.current?.focus();
                          }
                        }}
                        style={{
                          backgroundColor: "#fff",
                          shadowColor: "#ff",
                          shadowOpacity: 1,
                          fontSize: 19,
                          color: "#DA0037",
                          fontWeight: "bold",
                          width: 45,
                          height: 45,
                          borderRadius: 22,
                          margin: 6,
                          textAlign: "center",
                        }}
                      />
                      <TextInput
                        ref={nameref2}
                        onChangeText={(value) => {
                          setPin2(value);
                          if (value.length == 1) {
                            nameref3.current?.focus();
                          }
                        }}
                        keyboardType="numeric"
                        maxLength={1}
                        elevation={5}
                        style={{
                          backgroundColor: "#fff",
                          shadowColor: "#ff",
                          shadowOpacity: 1,
                          fontWeight: "bold",
                          fontSize: 19,
                          color: "#DA0037",
                          width: 45,
                          height: 45,
                          borderRadius: 22,
                          margin: 6,
                          textAlign: "center",
                        }}
                      />
                      <TextInput
                        ref={nameref3}
                        onChangeText={(value) => {
                          setPin3(value);
                          if (value.length == 1) {
                            nameref4.current?.focus();
                          }
                        }}
                        keyboardType="numeric"
                        maxLength={1}
                        elevation={5}
                        style={{
                          backgroundColor: "#fff",
                          fontWeight: "bold",

                          shadowColor: "#ff",
                          shadowOpacity: 1,
                          fontSize: 19,
                          color: "#DA0037",
                          width: 45,
                          height: 45,
                          borderRadius: 22,
                          margin: 6,
                          textAlign: "center",
                        }}
                      />
                      <TextInput
                        ref={nameref4}
                        onChangeText={(value) => {
                          setPin4(value);
                          if (value.length == 1) {
                            nameref5.current?.focus();
                          }
                        }}
                        keyboardType="numeric"
                        maxLength={1}
                        elevation={5}
                        style={{
                          backgroundColor: "#fff",
                          shadowColor: "#ff",
                          fontWeight: "bold",

                          shadowOpacity: 1,
                          fontSize: 19,
                          color: "#DA0037",
                          width: 45,
                          height: 45,
                          borderRadius: 22,
                          margin: 6,
                          textAlign: "center",
                        }}
                      />
                      <TextInput
                        ref={nameref5}
                        onChangeText={(value) => {
                          setPin5(value);
                          if (value.length == 1) {
                            nameref6.current?.focus();
                          }
                        }}
                        keyboardType="numeric"
                        maxLength={1}
                        elevation={5}
                        style={{
                          backgroundColor: "#fff",
                          fontWeight: "bold",

                          shadowColor: "#ff",
                          shadowOpacity: 1,
                          fontSize: 19,
                          color: "#DA0037",
                          width: 45,
                          height: 45,
                          borderRadius: 22,
                          margin: 6,
                          textAlign: "center",
                        }}
                      />
                      <TextInput
                        ref={nameref6}
                        onChangeText={async (value) => {
                          setPin6(value);
                        }}
                        keyboardType="numeric"
                        maxLength={1}
                        elevation={5}
                        style={{
                          backgroundColor: "#fff",
                          fontWeight: "bold",

                          shadowColor: "#ff",
                          shadowOpacity: 1,
                          fontSize: 19,
                          color: "#DA0037",
                          width: 45,
                          height: 45,
                          borderRadius: 22,
                          margin: 6,
                          textAlign: "center",
                        }}
                      />
                    </View>
                    <View style={{ top: 65 }}>
                      <Text style={{ color: "grey", textAlign: "center" }}>
                        Didn't got an OTP?{" "}
                        <Text
                          style={{ color: "#dA0037" }}
                          onPress={() => {
                            props.navigation.navigate("SignUp");
                          }}
                        >
                          Cancel
                        </Text>{" "}
                      </Text>
                    </View>
                    <Pressable
                      style={styles.loginnayabutton}
                      onPress={async () => {
                        try {
                          var pinvalue =
                            pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
                          setConfirmError(undefined);
                          setConfirmInProgress(true);

                          const credential = firebase.auth.PhoneAuthProvider.credential(
                            verificationId,
                            pinvalue
                          );
                          const authResult = await firebase
                            .auth()
                            .signInWithCredential(credential);
                          setConfirmInProgress(false);
                          setVerificationId("");
                          setVerificationCode("");

                          insertRecord();
                        } catch (err) {
                          console.log(err);
                          alert("Wrong OTP");
                          setConfirmError(err);
                          setConfirmInProgress(false);
                        }
                      }}
                    >
                      <Text style={styles.text}>Ok</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ) : (
              undefined
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginbutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderRadius: 30,
    top: 35,
    marginTop: 30,
    elevation: 3,
    backgroundColor: "#DA0037",
  },
  loginnayabutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderRadius: 30,
    top: 90,
    elevation: 3,
    backgroundColor: "#DA0037",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    top: 40,
    flexDirection: "column",
    flex: 1,

    backgroundColor: "#efefef",
  },
  nav: {
    flex: 0.1,
    justifyContent: "flex-end",
  },
  login: {
    top: 40,
  },
  body: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    paddingLeft: 50,
    width: 5,
    paddingBottom: 50,
    height: 5,
  },
  blood: {
    width: 100,
    height: 100,
    paddingBottom: 30,
  },
});
