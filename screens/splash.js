import React,{useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Colors, Spacing, Fonts } from '../components/Theme';

import Constants from 'expo-constants';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import Header from '../components/Header';

import callAPI from '../components/callAPI';
export default function Splash({ navigation }) {


    React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;            
  }, [navigation]);
   function loadData()
  {
setTimeout(function(){
 navigation.push('Home',{screen:"Home"})
 
    }, 800);
  }
    
  return (
    <View style={{ flex: 1 }}>    
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{ width: '40%', height: 400, width: 400, alignself: 'center' }}
          source={require('../assets/logowithout.png')}
        />
  <ActivityIndicator
              style={{ marginTop: 60 }}
              size={'large'}
              color={'red'}
            />
    
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: Colors.primary,
          fontWeight: 'bold',
          bottom:20,
        }}>
        A social initiative by
      </Text>
      <Text
        style={{
          
          textAlign: 'center',
          color: Colors.black,
          fontWeight: 'bold',
          bottom:20,
        }}>
        {' '}
        NepCode &
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: Colors.black,
          fontWeight: 'bold',
          bottom:20,
        }}>
        Kalika Manavgyan Secondary School
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
