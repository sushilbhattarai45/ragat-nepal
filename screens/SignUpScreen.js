import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DatePicker from "react-native-datepicker";

import { Ionicons } from "@expo/vector-icons";
import callAPI from "../components/callAPI";
import Header from "../components/Header";
import Input from "../components/Input";
import { Colors, Spacing, Fonts } from "../components/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      fn: "",
      phone: "",
      address: "",
      bloodg: "",
      dob: "",
      spinner: false,
      bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      toggle: false,
    };
    this.state.selectedBlood = this.state.bloodGroups[0];
  }
  componentDidMount = async () => {
    this.loadData();

    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.loadData();
    });
  };
  loadData = async () => {
    var num = await AsyncStorage.getItem("contact");
    if (num) {
      this.props.navigation.navigate("Home", { screen: "Home" });
    }
  };
  InsertRecord = () => {
    this.setState({ spinner: true });
    console.log("toggle" + this.state.toggle);
    var Name = this.state.fn;
    var Address = this.state.address;
    var Contact = "+977" + this.state.phone;
    var Bloodg = this.state.bloodg;
    var Dob = this.state.dob;
    if (this.state.toggle) {
      var Donor = "true";
    } else {
      var Donor = "false";
    }

    if (Name.length < 6) {
      alert("Short Input : Name ");
      this.setState({ spinner: false });
    } else if (Address.length < 8) {
      alert("Short Input : Address ");
      this.setState({ spinner: false });
    } else if (Contact.length < 14) {
      alert("Short Input : Phone Number ");
      this.setState({ spinner: false });
    } else if (Dob.length == 0) {
      alert("Missing Date of birth ");
      this.setState({ spinner: false });
    } else if (Bloodg.length == 0) {
      alert("Missing Blood Group ");
      this.setState({ spinner: false });
    } else {
      if (Contact.length > 14) {
        alert("Invalid Contact");

        this.setState({ spinner: false });
      } else {
        if (
          Name.includes("=") ||
          Address.includes("=") ||
          Name.includes("@") ||
          Name.includes("#") ||
          Name.includes("$") ||
          Name.includes("-") ||
          Name.includes("%") ||
          Name.includes("^") ||
          Name.includes("&") ||
          Name.includes("*") ||
          Name.includes("(") ||
          Address.includes("%") ||
          Address.includes("!") ||
          Address.includes("^") ||
          Address.includes("&") ||
          Address.includes("*") ||
          Address.includes("(") ||
          Address.includes("@") ||
          Name.includes("0") ||
          Name.includes("1") ||
          Name.includes("2") ||
          Name.includes("3") ||
          Name.includes("4") ||
          Name.includes("5") ||
          Name.includes("6") ||
          Name.includes("7") ||
          Name.includes("8") ||
          Name.includes("9") ||
          Name.includes("0") ||
          Name.includes(";") ||
          Address.includes(";")
        ) {
          alert("Invalid Input");
          this.setState({ spinner: false });
        } else {
          var Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;

          if (Regex.test(Contact == true)) {
            alert("Invalid Contact");
          } else {
            this.props.navigation.navigate("Otp", {
              cnum: Contact,
              address: Address,
              dob: Dob,
              bloodg: Bloodg,
              name: Name,
              error: 0,
              donor: Donor,
            });
            this.setState({ spinner: false });
          }
        }
      }
    }
  };
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: Spacing.m,
          backgroundColor: "#efefef",
        }}
      >
        <Ionicons
          name="chevron-back"
          onPress={() => {
            this.props.navigation.navigate("Home", { screen: "Home" });
          }}
          size={30}
          color="black"
          style={{ paddingLeft: 10, marginTop: 40 }}
        />
        <View style={{ marginTop: Spacing.m, alignItems: "center" }}>
          <Image style={styles.blood} source={require("../assets/blood.png")} />
          <Text style={{ marginTop: Spacing.x, ...Fonts.h1 }}>
            Lets Get Started!!
          </Text>
          <Text style={{ color: Colors.darkGrey }}>
            Save Life By Joining Us
          </Text>
        </View>
        {this.state.spinner ? (
          <ActivityIndicator
            style={{ marginTop: 30 }}
            size={"large"}
            color={"red"}
          />
        ) : (
          <View>
            <Text></Text>
          </View>
        )}
        <View style={{ flex: 3, marginTop: Spacing.xl }}>
          <Input
            icon="account"
            placeholder="Full Name"
            onChangeText={(value) => this.setState({ fn: value })}
            style={{ marginBottom: Spacing.m }}
          />
          <Input
            icon="map-marker"
            placeholder="Address (City-Ward, District)"
            onChangeText={(value) => this.setState({ address: value })}
            style={{ marginBottom: Spacing.m }}
          />
          <Input
            icon="phone"
            placeholder="Phone Number"
            onChangeText={(value) => this.setState({ phone: value })}
            style={{ marginBottom: Spacing.m }}
          />
          <Input
            icon="calendar"
            placeholder="Date of Birth (YYYY-MM-DD)"
            onChangeText={(value) => this.setState({ dob: value })}
            style={{ marginBottom: Spacing.m }}
          />
          {/* <View
            style={{
              backgroundColor: "white",
              elevation: 5,
              borderRadius: 30,
              height: 60,
            }}
          > */}
          {/* <DatePicker
              style={{
                width: "98%",
                elevation: 5,
                fontSize: 22,
                color: "black",
              }}
              date={this.state.dob}
              mode="date"
              placeholder={"Date Of Birth"}
              format="YYYY-MM-DD"
              minDate="1950-01-01"
              maxDate="2021-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              iconComponent={
                <FontAwesome
                  name="calendar"
                  size={24}
                  color={Colors.darkGrey}
                  style={{
                    position: "absolute",
                    left: 22,
                    top: 19,
                  }}
                />
              }
              showIcon={true}
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  top: 17,
                },
                dateText: {
                  left: -60,
                  fontSize: 16,
                },

                placeholderText: {
                  left: -60,
                  fontSize: 16,
                  color: "grey",
                },
                dateInput: {
                  backgroundColor: "white",
                  fontSize: 20,
                  borderWidth: 0,
                  color: "black",
                  borderRadius: 30,
                  height: 60,
                  width: "90%",
                  top: 10,
                },
              }}
              onDateChange={(date) => {
                this.setState({ dob: date });
              }}
            /> */}
          {/* </View> */}
          <View style={{ flexDirection: "row", left: 20, height: 60 }}>
            <Text
              style={{
                textAlignVertical: "center",
                ...Fonts.p1,
                color: Colors.darkGrey,
              }}
            >
              Want to be a Donor?
            </Text>
            <Switch
              value={this.state.toggle}
              onValueChange={(value) => {
                this.setState({ toggle: value });
                console.log(value);
              }}
            />
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            <Text
              style={{
                ...Fonts.p1,
                color: Colors.darkGrey,
                marginBottom: Spacing.x,
              }}
            >
              Choose Blood bloodGroups
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ borderRadius: 8 }}
            >
              {this.state.bloodGroups.map((item, i) => {
                const color =
                  item === this.state.bloodg ? Colors.white : Colors.primary;
                const bg =
                  item === this.state.bloodg
                    ? Colors.primary
                    : Colors.white_light;
                return (
                  <Pressable
                    key={i}
                    onPress={() => {
                      this.setState({ bloodg: item });
                    }}
                    style={[styles.bloodGroupItem, { backgroundColor: bg }]}
                  >
                    <Text
                      selectable={false}
                      style={{ ...Fonts.h4, color: color }}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={{ flex: 1, marginBottom: 30 }}>
              <Pressable style={styles.loginbutton} onPress={this.InsertRecord}>
                <Text style={styles.text}>Next</Text>
              </Pressable>
            </View>
            <Text style={{ textAlign: "center", marginVertical: Spacing.x }}>
              Already Have an account?
              <Text
                style={{ ...Fonts.p2, color: Colors.primary }}
                onPress={() =>
                  this.props.navigation.navigate("Auth", { screen: "Login" })
                }
              >
                {" "}
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  blood: {
    width: 100,
    height: 100,
    marginBottom: Spacing.s,
  },
  bloodGroupItem: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  loginbutton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    top: 30,
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
});
