import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Constants from "expo-constants";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import Header from "../components/Header";
import Input from "../components/Input";
import callAPI from "../components/callAPI";

import BloodGroupSlider from "../components/BloodGroupSlider";
import { Colors, Spacing, Fonts } from "../components/Theme";

const FindADonor = ({ navigation }) => {
  const BloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const DonorInfoCard = ({ name, address, phno }) => {
    const getInitials = (name) => {
      var fullName = name.split("");
      var initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
      return initials.toUpperCase();
    };

    const bg = () => `hsla(${Math.random() * 360}, 70%, 70%, 1)`;
    return (
      <View style={styles.donorInfoCard}>
        <View style={[styles.nameBoard, { backgroundColor: bg() }]}>
          <Text
            style={{ ...Fonts.h1, color: Colors.white, fontWeight: "normal" }}
          >
            {getInitials(name)}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: Spacing.m }}>
          <Text style={Fonts.p2}>{name}</Text>
          <Text style={{ color: Colors.darkGrey }}>{address}</Text>
        </View>
        <View
          style={{
            padding: Spacing.s,
            backgroundColor: Colors.lightGrey,
            borderRadius: 100,
            opacity: 0.5,
          }}
        >
          <Icon
            name="phone"
            color="lime"
            size={25}
            onPress={() => {
              Linking.openURL(`tel:${phno}`);
            }}
          />
        </View>
      </View>
    );
  };
  const [selectedBlood, setSelectedBlood] = React.useState(BloodGroups[0]);
  const [spinner, setSpinner] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [donorList, setDonorList] = React.useState(null);

  React.useEffect(() => {
    const getDonors = async (bloodGroup, address) => {
      setSpinner(true);
      const url = "https://ragatnepal.000webhostapp.com/api/donor.php";
      var contact = await AsyncStorage.getItem("contact");
      let data = {
        group: bloodGroup,
        address: address,
        contact: contact,
      };
      let res = await callAPI(url, data);
      setDonorList(res.data);
      setSpinner(false);
    };
    if (address !== "") {
      getDonors(selectedBlood, address);
    } else {
      setDonorList(null);
    }
  }, [address, selectedBlood]);
  return (
    <SafeAreaView style={[styles.container, { paddingHorizontal: Spacing.m }]}>
      <Header
        iconL="chevron-left"
        headerText="Find A Donor"
        onPressL={navigation.goBack}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          placeholder="Address (District City)"
          icon="map-marker"
          onChangeText={(val) => {
            setAddress(val.trim());
          }}
          style={{ marginVertical: Spacing.m }}
        />
        <View style={{ marginBottom: Spacing.xl }}>
          <Text
            style={{
              ...Fonts.p1,
              color: Colors.darkGrey,
              marginBottom: Spacing.s,
            }}
          >
            Choose Blood Groups
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ borderRadius: 8 }}
          >
            {BloodGroups.map((item, i) => {
              const color =
                item === selectedBlood ? Colors.white : Colors.primary;
              const bg =
                item === selectedBlood ? Colors.primary : Colors.white_light;
              return (
                <Pressable
                  key={i}
                  onPress={() => {
                    setSelectedBlood(item);
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
        </View>
        <View>
          <Text style={{ ...Fonts.h4, marginBottom: Spacing.x }}>
            Donors Near You
          </Text>
          <View>
            {spinner ? (
              <ActivityIndicator
                style={{ marginTop: 30 }}
                size={"large"}
                color={"red"}
              />
            ) : donorList === null ? null : (
              donorList.map((donor) => {
                return (
                  <DonorInfoCard
                    key={donor.uid}
                    name={donor.name}
                    address={donor.address}
                    phno={donor.contact}
                  />
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default FindADonor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  donorInfoCard: {
    backgroundColor: Colors.white_light,
    borderRadius: 20,
    paddingRight: 20,
    paddingVertical: Spacing.m,
    marginLeft: Spacing.m,
    marginBottom: Spacing.x,
    flexDirection: "row",
    alignItems: "center",
  },
  nameBoard: {
    height: 70,
    width: 70,
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: Colors.white,
    borderRadius: 20,
    marginTop: -(10 + Spacing.m),
    marginLeft: -Spacing.m,
  },
  bloodGroupItem: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    marginRight: 16,
    borderRadius: 8,
  },
});
