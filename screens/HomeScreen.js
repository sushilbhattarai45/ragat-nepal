import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,  
  Pressable,
  ScrollView,
  FastImage,
  Linking,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from 'react-native';

import Header from '../components/Header';
import Input from '../components/Input';
import callAPI from '../components/callAPI';   
import UserInfoCard from '../components/UserInfoCard';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { Colors, Spacing, Fonts } from '../components/Theme';
// import { SliderBox } from 'react-native-image-slider-box';

const HomeScreen = ({ navigation }) => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  const [contact, setContact] = React.useState('');
  const [spinner, setSpinner] = React.useState(false);
  const [imgList, setImgList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getImg = async () => {
    const url = 'https://ragatnepal.com/api/images.php';
    setLoading(true);
    let res = await callAPI(url, {});
    res.errorstate ? alert(res.message) : null;
    let list = res.data.map((hello) => hello['location']);
    setImgList(list);
    setLoading(false);
  };

  async function loadData() {
    const num = await AsyncStorage.getItem('contact');
    setLoggedIn(num);
    await getProfile();
    await getImg();
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);
  async function getProfile() {
    var num = await AsyncStorage.getItem('contact');
    if (num) {
      setSpinner(true);

      setLoggedIn(true);
      const profileAPI = 'https://ragatnepal.com/api/profileapi.php';
      const donationAPI =
        'https://ragatnepal.com/api/donationgetapi.php';
      let data = { name: '', bloodGroup: '', donations: 0 };
      let res = await callAPI(donationAPI, { contact: num });
      if (res.data !== null) {
        res.errorstate ? alert(res.message) : null;
        data.donations = res.data.length;
      }
      res = await callAPI(profileAPI, { contact: num });
      if (res.data !== null) {
        res.errorstate ? alert(res.message) : null;
        data.name = res.data[0].name;
        data.bloodGroup = res.data[0].bgroup;
      }
      setSpinner(false);
      setUserInfo(data);
    }
  }
  return (
    <ScrollView style={{ flex: 1,paddingBottom:50 }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: Colors.primary,
            marginTop: Constants.statusBarHeight,
          },
        ]}>
        <View style={{ paddingHorizontal: Spacing.m }}>
          <Header
            iconL="menu"
            bg
            onPressL={navigation.openDrawer}
            iconR="user"
            onPressR={() => navigation.push('Home', { screen: 'Profile' })}
          />
          {!loggedIn && (
            <View>
              <Text
                style={[
                  Fonts.h1,
                  { color: Colors.white, marginVertical: Spacing.l },
                ]}>
                Welcome!
              </Text>
              <View>
                <Text style={[Fonts.h4, { color: Colors.white }]}>
                  Want to be a donor?
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Pressable
                    style={[styles.button, { backgroundColor: Colors.white }]}
                    onPress={() =>
                      navigation.navigate('Auth', { screen: 'SignUp' })
                    }>
                    <Text style={[Fonts.h4, { color: Colors.primary }]}>
                      SIGN UP
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button]}
                    onPress={() =>
                      navigation.navigate('Auth', { screen: 'Login' })
                    }>
                    <Text style={[Fonts.h4, { color: Colors.white }]}>
                      LOGIN
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
          {loggedIn && (
            <View>
              <Text
                style={[
                  Fonts.h1,
                  { color: Colors.white, marginVertical: Spacing.l },
                ]}>
                Welcome
              </Text>
              <UserInfoCard
                {...userInfo}
                style={{
                  marginTop: 0,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  marginBottom: 10,
                }}
              />
            </View>
          )}
        </View>

        <View style={[styles.container, styles.curvedContainer]}>
          {spinner ? (
            <ActivityIndicator
              style={{ marginTop: 30 }}
              size={'large'}
              color={'red'}
            />
          ) : null}
          <Text style={Fonts.h4}>Find A Donor</Text>

          <Pressable
            elevation={5}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 30,
              backgroundColor: Colors.white,
              shadowOpacity: 0.5,
              shadowRadius: 5,
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginTop:Spacing.m
            }}
            onPress={() => {
              navigation.navigate('FindADonor');
            }}>
              <Icon name={'map-marker'} size={24} color={Colors.darkGrey} />
              <Text
                style={{
                  fontSize: 16,
                  marginHorizontal: 8,
                  width: '90%',
                  paddingLeft: 0,
                  color: Colors.darkGrey,
                  outline: 'none',
                }}>
                {' '}
                Find A Donor
              </Text>
          </Pressable>
       <Text
            style={{
              fontSize: 16,
              marginTop:20,
              fontWeight: 'bold',
            }}>
            Supported By  :
          </Text>
 <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 60,
            }}>
            <View
              style={{
                flexDirection: 'column',
                backgroundColor: 'white',
                flex: 0.45,
                alignItems: 'center',
                padding: 16,
                borderRadius: 16,
              }}>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginTop: -50,
                }}
                source={require('../assets/tilottama.jpg')}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 12,
                  position: 'relative',
                }}>
Tilottama Municipality 
</Text>
              <Text style={{ textAlign: 'center', fontSize: 9 }}>
Financial  & Resource Support
              </Text>
         <View
                style={{
                  flexDirection: 'row',
                }}>
                <Icon
                  name="search-web"
                  size={24}
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  color="#DA0037"
                  onPress={() =>
                    Linking.openURL('https://tilottamamun.gov.np/en')
                  }
                />
                <Icon
                  name="facebook"
                  size={23}
                  color="blue"
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  onPress={() =>
                    Linking.openURL('https://www.facebook.com/tillottam')
                  }
                />
              </View>
            </View>
            
            <View
              style={{
                flexDirection: 'column',
                backgroundColor: 'white',
                flex: 0.45,
                alignItems: 'center',
                padding: 16,
                borderRadius: 16,
              }}>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  marginTop: -50,
                }}
                source={require('../assets/kalika.jpg')}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 12,
                  position: 'relative',
                }}>
Kalika Manavgyan S.S </Text>
              <Text style={{ textAlign: 'center', fontSize: 9 }}>
Educational Partner
        </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Icon
                  name="search-web"
                  size={24}
                  style={{ marginHorizontal: 5, marginTop: 10 }}
                  color="#DA0037"
                  onPress={() =>
                    Linking.openURL(
'https://www.kalikaschoolbtl.edu.np/'       
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
'https://www.facebook.com/kalikamanavgyansecondaryschool/'
                    )
                  }
                />
              </View>
            </View>
            
          </View>
     
          
        </View>
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  curvedContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 40,
    paddingHorizontal: 16,
    marginTop: 8,
  },

  button: {
    borderColor: '#ffffff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 8,
    marginVertical: 8,
    marginRight: 16,
  },

});
