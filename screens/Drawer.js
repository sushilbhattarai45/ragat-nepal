import React, { useEffect } from 'react';
import { Text, View, Switch, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import callAPI from '../components/callAPI';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDrawerContent(props) {
  // let [contact, setContact] = React.useState('');
  // const [toggle, setToggle] = React.useState('');

  // const getToggle = () => {
  //   const url = 'https://ragatnepal.com/api/availability.php';
  //   if (contact) {
  //     const res = callAPI(url, { contact, donor: null });
  //     setToggle(res[0].donor);
  //     console.log('getToggle' + res[0].donor);
  //   }
  // };
  // if (toggle == '') {
  //   getToggle();
  // }
  // const updateToggle = (value) => {
  //   setToggle(value);
  //   const url = 'https://ragatnepal.com/api/availability.php';
  //   if (contact) {
  //     let res = callAPI(url, { contact, donor: toggle });
  //     console.log(res[0]);
  //   }
  // };
  // const getContact = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('contact');
  //     if (value !== null && value !== '') {
  //       setContact(value);
  //       contact = value;
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // useEffect(() => {
  //   getContact();
  // });
  return (
    <DrawerContentScrollView {...props} style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Image
          style={{ resizeMode: 'cover', width: '100%', height: 200 }}
          source={require('../assets/logowithout.png')}
        />
      </View>
      <DrawerItemList {...props} />
      {
        // {contact && toggle !== '' ? (
        //   <View
        //     style={{
        //       flexDirection: 'row',
        //       alignItems: 'center',
        //       padding: 10,
        //     }}>
        //     <Switch
        //       style={{ padding: 0 }}
        //       onValueChange={updateToggle}
        //       value={toggle}
        //     />
        //     <Text style={{ marginLeft: 20, color: '#666666' }}>
        //       Available as a donor?
        //     </Text>
        //   </View>
        // ) : null}
      }
    </DrawerContentScrollView>
  );
}
