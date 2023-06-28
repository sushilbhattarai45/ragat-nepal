import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Image,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Switch } from "react-native-elements";

import { Formik } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import Input from "../components/Input";
import RNDATE from "@react-native-community/datetimepicker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import callAPI from "../components/callAPI";
import { Colors, Spacing, Fonts } from "../components/Theme";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  address: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  dob: Yup.string().required("Required"),
});
const ProfileEdit = ({ navigation, route }) => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const submit = async (values) => {
    try {
      const url = "https://ragatnepal.com/api/update.php";
      const num = AsyncStorage.getItem("contact");
      if (num) {
        values["donor"] = `${values["donor"]}`;
        console.log(values);
        const res = await callAPI(url, { ...values });
        console.log(res);
        res.errorstate
          ? alert(res.message)
          : alert("Your Data has been updated");
        navigation.navigate("Profile");
      }
    } catch (e) {
      // console.warn(e);
    }
  };
  var userdata = {
    address: route.params.userdata["address"],
    dob: route.params.userdata["dob"],
    contact: route.params.userdata["contact"],
    bgroup: route.params.userdata["bgroup"],
    donor: !!JSON.parse(String(route.params.userdata["donor"]).toLowerCase()),
    name: route.params.userdata["name"],
  };
  console.log(userdata);
  return (
    <Formik
      initialValues={userdata}
      validationSchema={SignupSchema}
      onSubmit={(values) => submit(values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View
          style={{
            paddingHorizontal: Spacing.m,
            flex: 1,
            backgroundColor: "#f1f1f1",
          }}
        >
          <Header
            iconL="chevron-left"
            iconR="check"
            headerText="Edit"
            onPressL={navigation.goBack}
            onPressR={handleSubmit}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: Spacing.x }}
          >
            <KeyboardAvoidingView
              style={{ marginTop: Spacing.x, justifyContent: "center" }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -30,
                }}
              >
                <Image
                  style={{
                    width: "40%",
                    height: 200,
                    alignself: "center",
                  }}
                  source={require("../assets/logowithout.png")}
                />
              </View>
              <View>
                <Input
                  icon="account"
                  placeholder="Full Name"
                  onChangeText={handleChange("name")}
                  value={values.name}
                  returnKeyType="next"
                  error={errors.name}
                  touched={touched.name}
                  onBlur={handleBlur}
                />
                <Input
                  icon="map-marker"
                  placeholder="Address (City-Ward, Abc, District)"
                  onChangeText={handleChange("address")}
                  value={values.address}
                  returnKeyType="next"
                  error={errors.address}
                  touched={touched.address}
                  onBlur={handleBlur}
                />
                <Input
                  icon="phone"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                  onChangeText={handleChange("contact")}
                  value={values.contact}
                  returnKeyType="next"
                  editable={false}
                />
                <View
                  style={{
                    backgroundColor: "white",
                    elevation: 5,
                    borderRadius: 30,
                    height: 60,
                    marginBottom: Spacing.m,
                  }}
                >
                  <DatePicker
                    style={{
                      width: "98%",
                      elevation: 5,
                      fontSize: 22,
                      color: "black",
                    }}
                    date={values.dob}
                    mode="date"
                    placeholder={"Date Of Birth"}
                    format="YYYY-MM-DD"
                    minDate="1950-01-01"
                    maxDate="2021-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    iconComponent={
                      <Icon
                        name="calendar"
                        size={24}
                        color={
                          !touched.dob
                            ? Colors.darkGrey
                            : errors.dob
                            ? Colors.primary
                            : Colors.darkGrey
                        }
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
                        // position: 'absolute',
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
                    onDateChange={handleChange("dob")}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      textAlignVertical: "center",
                      ...Fonts.p1,
                      color: Colors.darkGrey,
                    }}
                  >
                    Available as a donor?
                  </Text>
                  <Switch
                    value={values.donor}
                    onValueChange={(value) => setFieldValue("donor", value)}
                  />
                </View>

                <View style={{ flex: 1, marginTop: Spacing.m }}>
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
                    {bloodGroups.map((item, i) => {
                      const color =
                        item === values.bgroup ? Colors.white : Colors.primary;
                      const bg =
                        item === values.bgroup
                          ? Colors.primary
                          : Colors.white_light;
                      return (
                        <Pressable
                          key={i}
                          onPress={() => setFieldValue("bgroup", item)}
                          style={[
                            styles.bloodGroupItem,
                            { backgroundColor: bg },
                          ]}
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
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  bloodGroupItem: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    marginRight: Spacing.m,
    borderRadius: 8,
  },
});

export default ProfileEdit;
