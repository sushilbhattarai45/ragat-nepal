import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors, Spacing, Fonts } from '../components/Theme';
import UserInfoCard from '../components/UserInfoCard';
import Constants from 'expo-constants';
import callAPI from '../components/callAPI';
import { Feather as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';

const ProfileScreen = ({ navigation }) => {
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return year + '-' + month + '-' + date;
  };
  async function loadData() {
    await getProfile();
    getCurrentDate();
    await getDonations();
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);
  // contact == null ? navigation.navigate('Auth', { screen: 'Login' }) : null;
  const [loading, setLoading] = React.useState(false);
  const [UserInfo, setUserInfo] = React.useState({
    name: '##########',
    address: '##########',
    contact: '98********',
    bgroup: '##',
  });
  const [donations, setDonations] = React.useState([]);
  const [contact, setContact] = React.useState('');

  const [modalVisible, setModalVisible] = React.useState(false);
  const addDonation = (address, date) => {
    let d = new Date();
    if (address.trim() !== '' && date.trim() !== '') {
      if (
        address.includes('%') ||
        address.includes('!') ||
        address.includes('^') ||
        address.includes('&') ||
        address.includes('*') ||
        address.includes('€') ||
        address.includes('@') ||
        address.includes('=') ||
        address.includes('+')
      ) {
        alert('Wrong Input');
      } else {
        let id = '_' + (d.getDate() + d.getTime());
        postDonation({ id: id, date: date, address: address });
        setModalVisible(!modalVisible);
      }
    } else {
      alert('Please enter valid information');
    }
  };
  async function getProfile() {
    const url = 'https://ragatnepal.com/api/profileapi.php';
    var num = await AsyncStorage.getItem('contact');
    if (num) {
      let res = await callAPI(url, { contact: num });
      if (res.data !== null) {
        res.errorstate ? alert(res.message) : null;
        setUserInfo(res.data[0]);
      }
    } else {
      Alert.alert('Login Required', 'You need to login to have a profile', [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Auth', { screen: 'Login' }),
        },
      ]);
    }
  }
  async function getDonations() {
    var num = await AsyncStorage.getItem('contact');
    if (num) {
      const url = 'https://ragatnepal.com/api/donationgetapi.php';

      let res = await callAPI(url, { contact: num });
      res.errorstate ? alert(res.message) : setDonations(res.data);
    }
  }

  async function removeDonation(id) {
    var num = await AsyncStorage.getItem('contact');

    const url = 'https://ragatnepal.com/api/donationdeleteapi.php';
    let res = await callAPI(url, { contact: num, id });
    await getDonations();
  }
  async function postDonation(donation) {
    var num = await AsyncStorage.getItem('contact');
    if (num) {
      const url = 'https://ragatnepal.com/api/donationpostapi.php';
      let res = await callAPI(url, { ...donation, contact: num });
      await getDonations(contact);
    } else {
      alert('Please Login First');
    }
  }

  const DonationCard = ({ date, address, id }) => {
    return (
      <View style={styles.donationCard}>
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: Colors.primary,
            borderRadius: 100,
            top: -Spacing.s,
            marginRight: Spacing.m,
          }}></View>
        <View style={styles.donationCardText}>
          <Text style={{ fontSize: 24, color: Colors.black }}>{date}</Text>
          <Text style={{ ...Fonts.p1, color: Colors.darkGrey }}>
            At {address}
          </Text>

        </View>
        <Icon
          name="trash-2"
          size={20}
          selectable={false}
          color={Colors.primary}
          onPress={() => removeDonation(id)}
        />
      </View>
    );
  };
  const InputModal = () => {
    const [address, setAddress] = React.useState('');
    const [date, setDate] = React.useState('');
    const modalHandler = () => {
      setModalVisible(!modalVisible);
    };

    return (
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000066',
          }}
          onPress={modalHandler}>
          <TouchableWithoutFeedback>
            <View
              style={{
                width: '90%',
                backgroundColor: Colors.lightGrey,
                // opacity: 0.9,
                padding: Spacing.x,
                borderRadius: 20,
              }}>
              
              <View
                style={{
                  backgroundColor: 'white',
                  elevation: 5,
                  borderRadius: 30,
                  height: 60,
                }}>
                <DatePicker
                  style={{
                    width: '98%',
                    elevation: 5,
                    fontSize: 22,
                    color: 'black',
                  }}
                  date={date}
                  mode="date"
                  placeholder={'Date : ' + date}
                  format="YYYY-MM-DD"
                  minDate="1970-01-01"
                  maxDate={getCurrentDate()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconComponent={
                    <FontAwesome
                      name="calendar"
                      size={24}
                      color={Colors.darkGrey}
                      style={{
                        position: 'absolute',
                        left: 20,
                        top: 19,
                      }}
                    />
                  }
                  showIcon={true}
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      top: 17,
                    },

                    dateText: {
                      left: -45,
                      fontSize: 16,
                    },

                    placeholderText: {
                      left: -60,
                      fontSize: 16,
                      color: 'grey',
                    },
                    dateInput: {
                      backgroundColor: 'white',
                      fontSize: 20,
                      borderWidth: 0,
                      color: 'black',
                      borderRadius: 30,
                      height: 60,
                      width: '90%',
                      top: 10,
                    },
                  }}
                  onDateChange={(date) => {
                    setDate(date);
                  }}
                />
              </View>
              <View
                elevation={5}
                style={[styles.inputContainer, { marginTop: Spacing.xl }]}>
                <Icon name="map-pin" size={20} color={Colors.darkGrey} />
                <TextInput
                  placeholder="Enter Address"
                  onChangeText={(val) => setAddress(val)}
                  blurOnSubmit={false}
                  style={styles.textInput}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: Spacing.x,
                }}>
                <Pressable
                  elevation={5}
                  onPress={() => addDonation(address, date)}
                  style={[
                    styles.button,
                    { width: '100%', backgroundColor: 'limegreen' },
                  ]}>
                  <Icon name="check" size={20} color={Colors.white} />
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    );
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        { paddingHorizontal: Spacing.m, marginTop: Constants.statusBarHeight },
      ]}>
      <Header
        iconL="chevron-left"
        iconR="edit"
        headerText="Profile"
        onPressL={navigation.goBack}
        onPressR={()=>navigation.navigate('ProfileEdit',{userdata: UserInfo})}
      />
      <UserInfoCard
        donations={donations ? donations.length : 0}
        name={UserInfo.name}
        address={UserInfo.address}
        phno={UserInfo.contact}
        bloodGroup={UserInfo.bgroup}
      />

      <View>
        <View
          style={{
            marginTop: Spacing.x,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Icon
              name="plus"
              size={24}
              selectable={false}
              color={Colors.darkGrey}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>

          <Text style={{ ...Fonts.h4 }}>Donation History</Text>
          <MaterialIcons
            name="logout"
            size={24}
            color="black"
            onPress={async () => {
              var num = await AsyncStorage.getItem('contact');
              if (num) {
                await AsyncStorage.removeItem('contact');
                alert('Logged Out Successfully');
                navigation.navigate('Auth', { screen: 'Login' });
              } else {
                alert('Please LogIn First');
              }
            }}
          />
        </View>
        <View>
          {loading ? (
            <ActivityIndicator
              style={{ marginTop: 30 }}
              size={'large'}
              color={'red'}
            />
          ) : null}
          {donations
            ? donations.map((donation) => (
                <DonationCard
                  id={donation.did}
                  address={donation.address}
                  date={donation.date}
                  key={donation.did}
                />
              ))
            : null}
        </View>
      </View>
      <InputModal />
    </ScrollView>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },

  donationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.m,
  },
  donationCardText: {
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    marginHorizontal: 8,
    width: '100%',
    paddingLeft: 0,
    color: Colors.black,
    outline: 'none',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.white,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
