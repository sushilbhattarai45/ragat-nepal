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
  Switch,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import Input from "../components/Input";
import DatePicker from "react-native-datepicker";

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
      const num = await AsyncStorage.getItem("contact");
      console.log(num);
      if (num) {
        console.log("ok" + num);
        console.log(`${values["donor"]}`);
        values["donor"] = `${values["donor"]}`;
        alert("jello");
        const res = await callAPI(url, { ...values });
        console.log("okkkkkkk" + res.errorstate);
        res.errorstate
          ? console.log(res.message)
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
                  <Input
                    type="numeric"
                    icon="calendar"
                    value={values.dob}
                    height={30}
                    placeholder="Date of birth(YYYY-MM-DD)"
                    onChangeText={handleChange("dob")}
                    style={{ marginBottom: Spacing.m }}
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
                    onValueChange={(value) => {
                      console.log(value);
                      setFieldValue("donor", value);
                    }}
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
