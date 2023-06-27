import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
  Clipboard,
} from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import Header from "../components/Header";

import callAPI from "../components/callAPI";
export default function Contact({ navigation }) {
  const copyemail = () => {
    Clipboard.setString("contact@ragatnepal.com");
    alert("Copied Sucessfully");
  };

  const copynum = () => {
    Clipboard.setString("9742993345");
    alert("Copied Sucessfully");
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          iconL="chevron-left"
          headerText="Contact"
          onPressL={() => navigation.navigate("Home", { screen: "Home" })}
        />
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "white",
              paddingHorizontal: 16,
              marginVertical: 24,
              borderRadius: 16,
              paddingVertical: 24,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Get In <Text style={{ color: "#DA0037" }}>Touch</Text>{" "}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  backgroundColor: "#ecf0f1",
                  flex: 0.5,
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 16,
                }}
              >
                <Icon name="email" size={30} color="#da0037" />
                <Text
                  style={{ padding: 4, textAlign: "center" }}
                  onPress={() => copyemail()}
                >
                  contact@ragatnepal.com
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  backgroundColor: "#ecf0f1",
                  flex: 0.45,
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 16,
                }}
              >
                <Icon name="phone" size={30} color="#da0037" />
                <Text style={{ padding: 4 }} onPress={() => copynum()}>
                  9863196247
                </Text>
                <Text>9742993345</Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Developers
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 58,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "white",
                flex: 0.45,
                alignItems: "center",
                padding: 16,
                borderRadius: 16,
              }}
            >
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginTop: -50,
                }}
                source={require("../assets/12.jpg")}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 13.6,
                  position: "relative",
                }}
              >
                Sanskar Lamsal
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9 }}>
                Full Stack Developer
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="instagram"
                  size={24}
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  color="#DA0037"
                  onPress={() =>
                    Linking.openURL("https://www.instagram.com/sans_caar/")
                  }
                />
                <Icon
                  name="facebook"
                  size={23}
                  color="blue"
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  onPress={() =>
                    Linking.openURL("https://www.facebook.com/Sanskar.lmsl")
                  }
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                backgroundColor: "white",
                flex: 0.45,
                alignItems: "center",
                padding: 16,
                borderRadius: 16,
              }}
            >
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginTop: -50,
                }}
                source={require("../assets/1.jpg")}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 13.6,
                  position: "relative",
                }}
              >
                Sushil Bhattarai
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9 }}>
                Full Stack Developer
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="instagram"
                  size={24}
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  color="#DA0037"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.instagram.com/sushil_bhattarai45"
                    )
                  }
                />
                <Icon
                  name="facebook"
                  size={23}
                  color="blue"
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.facebook.com/sushilbhattaraiofficial"
                    )
                  }
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 58,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "white",
                flex: 0.45,
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 16,
                borderRadius: 16,
              }}
            >
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginTop: -50,
                }}
                source={require("../assets/pp.jpg")}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 13.6,
                  position: "relative",
                }}
              >
                Pujan Pokharel
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9 }}>
                Graphics Designer
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="instagram"
                  size={24}
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  color="#DA0037"
                  onPress={() =>
                    Linking.openURL(
                      "https://www.instagram.com/PujanPokharelOfficial"
                    )
                  }
                />
                <Icon
                  name="facebook"
                  size={23}
                  color="blue"
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.facebook.com/OfficialPujanPokharel"
                    )
                  }
                />
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 24,
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            Supported By :
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 60,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "white",
                flex: 0.45,
                alignItems: "center",
                padding: 16,
                borderRadius: 16,
              }}
            >
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginTop: -50,
                }}
                source={require("../assets/tilottama.jpg")}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 12,
                  position: "relative",
                }}
              >
                Tilottama Municipality
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9 }}>
                Resource Support
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="search-web"
                  size={24}
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  color="#DA0037"
                  onPress={() =>
                    Linking.openURL("https://tilottamamun.gov.np/en")
                  }
                />
                <Icon
                  name="facebook"
                  size={23}
                  color="blue"
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  onPress={() =>
                    Linking.openURL("https://www.facebook.com/tillottam")
                  }
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                backgroundColor: "white",
                flex: 0.45,
                alignItems: "center",
                padding: 16,
                borderRadius: 16,
              }}
            >
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginTop: -50,
                }}
                source={require("../assets/kalika.jpg")}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 12,
                  position: "relative",
                }}
              >
                Kalika Manavgyan S.S{" "}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9 }}>
                Educational Partner
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="search-web"
                  size={24}
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  color="#DA0037"
                  onPress={() =>
                    Linking.openURL("https://www.kalikaschoolbtl.edu.np/")
                  }
                />
                <Icon
                  name="facebook"
                  size={23}
                  color="blue"
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.facebook.com/kalikamanavgyansecondaryschool/"
                    )
                  }
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 60,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "white",
                flex: 0.45,
                alignItems: "center",
                padding: 16,
                borderRadius: 16,
              }}
            >
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginTop: -50,
                }}
                source={require("../assets/nepal.png")}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 12,
                  position: "relative",
                }}
              >
                Galyang Municipality
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9 }}>
                Resource Support
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="search-web"
                  size={24}
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  color="#DA0037"
                  onPress={() => Linking.openURL("https://galyangmun.gov.np/")}
                />
                <Icon
                  name="facebook"
                  size={23}
                  color="blue"
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  onPress={() =>
                    Linking.openURL("https://www.facebook.com/galyangmun/")
                  }
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                backgroundColor: "white",
                flex: 0.45,
                alignItems: "center",
                padding: 16,
                borderRadius: 16,
              }}
            >
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginTop: -50,
                }}
                source={require("../assets/nepal.png")}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 12,
                  position: "relative",
                }}
              >
                Butwal Municipity{" "}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 9 }}>
                Resource Suport{" "}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Icon
                  name="search-web"
                  size={24}
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  color="#DA0037"
                  onPress={() => Linking.openURL("https://butwalmun.gov.np/")}
                />
                <Icon
                  name="facebook"
                  size={23}
                  color="blue"
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  onPress={() =>
                    Linking.openURL("https://www.facebook.com/butwalmun")
                  }
                />
              </View>
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              Copyright © NepCode
            </Text>
            <Text style={{ textAlign: "center" }}>All Rights Reserved</Text>
            <Text style={{ textAlign: "center" }}>info.nepcode@gmail.com</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 16,
  },
});
