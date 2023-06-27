//notifi.js
import React, { useState, useEffect } from 'react';
import { Button, Text, View, FlatList,Linking,TouchableOpacity,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import callAPI from '../components/callAPI';

import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

function GenScreen({ navigation, props }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(async() => {
        var num = await AsyncStorage.getItem('contact');
    var data = {
      contact: num,
      key:'5485FE5759545A4A',
    };
    var url = 'https://ragatnepal.com/api/notificationgetapi.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
    <View style={{ flex: 1, margin: 10 }}>
      <Header
        iconL="chevron-left"
        headerText="Messages"
        onPressL={navigation.goBack}
      />

      <View style={{ flex: 1, marginTop: 5, margin: 20 }}>
        <FlatList
          data={data.data}        
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 30,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <View style={{}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                    {item.header}
                  </Text>
                </View>
                <View style={{}}>
                  <Text style={{}}>{item.notifi}</Text>
                </View>
<TouchableOpacity onPress={() => Linking.openURL(item.link)}>
  <Text style={{color: 'blue'}}>
{item.link}  </Text>
</TouchableOpacity>
            </View>
            </View>
          )}
        />
      </View>
    </View>
    </ScrollView>
  );
}

function UserScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [datauser, setDatauser] = useState([]);

  useEffect(async () => {
    var contact = await AsyncStorage.getItem('contact');
    var data = {
      contact: contact,
      key:'5485FE5759545A4A',
    };
    var url = 'https://ragatnepal.com/api/notificationgetapi.php';   
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => setDatauser(json))
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);







  
  return (
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>

    <View style={{ flex: 1, margin: 10 }}>
      <Header
        iconL="chevron-left"
        headerText="Messages"
        onPressL={navigation.goBack}
      />               

      <View style={{ flex: 1, marginTop: 5, margin: 20 }}>
        <FlatList
          data={datauser.datanotifi}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 30,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                paddingBottom: 10,
              }}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <View style={{}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                    {item.header}
                  </Text>
                </View>
                <View style={{}}>
                  <Text style={{}}>{item.notifi}</Text>
                </View>
                  <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
  <Text style={{color: 'blue'}}>
{item.link}
  </Text>                
</TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
    </ScrollView>
  );
}

const Tab = createBottomTabNavigator();

export default function notifi() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const length = data.datal;
  const lengthul = data.dataul;

  useEffect(async () => {
    var num = await AsyncStorage.getItem('contact');
    var data = {
      contact: num,
      key:'5485FE5759545A4A',
    };
    var url = 'https://ragatnepal.com/api/notificationgetapi.php';
    var headers = {
      Accept: 'application/json',                                         
      'Content-Type': 'application/json',
    };
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="General"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'General') {
            return (
              <Ionicons
                name={focused ? 'notifications-circle' : 'notifications-circle'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Personal') {
            return (
              <Ionicons
                name={
                  focused ? 'notifications-outline' : 'notifications-outline'
                }
                size={size}
                color={color}   
              />                                   
            );
          }
        },
        tabBarInactiveTintColor: 'gray',    
        tabBarActiveTintColor: '#DA0037',
      })}>
      <Tab.Screen
        name="General"
        component={GenScreen}
        options={{ tabBarBadge: length, headerShown: false }}
      />
      <Tab.Screen
        name="Personal"
        component={UserScreen}
        options={{ tabBarBadge: lengthul, headerShown: false }}
      />
    </Tab.Navigator>
  );
}
