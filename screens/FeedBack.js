//Feedback.js
import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import { Colors, Spacing, Fonts } from '../components/Theme';
import callAPI from '../components/callAPI';

import { Feather as Icon } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

const FeedbackStack = createStackNavigator();
const PostFeedBack = ({ navigation }) => {
  return (
    <View style={[styles.container, { paddingHorizontal: Spacing.m }]}>
      <Header
        iconL="chevron-left"
        headerText="FeedBack"
        onPressL={navigation.goBack}
      />
      <View
        style={{
          flex: 1,          
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.white,
            borderRadius: 20,
            padding: Spacing.x,
            alignItems: 'center',
          }}>
          <Icon size={80} name="check-circle" color={Colors.primary} />
          <Text
            style={{ ...Fonts.h2, color: Colors.black, marginTop: Spacing.m }}>
            Feedback Sent
          </Text>
          <Text
            style={{
              ...Fonts.p1,
              textAlign: 'center',
              color: Colors.darkGrey,
              marginTop: Spacing.m,
            }}>
            We will review your feedback and respond quickly.
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.push('Home')}
          style={{
            marginHorizontal: Spacing.s,
            borderRadius: 25,
            padding: Spacing.m,
            width: '80%',
            alignItems: 'center',
            backgroundColor: Colors.primary,
            marginTop: Spacing.x,
          }}>
          <Text style={{ color: Colors.white }}>OK</Text>
        </Pressable>
      </View>
    </View>
  );
};
const FeedbackInput = ({ navigation }) => {
  const [heading, setHeading] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [contact, setContact] = React.useState('');

  const handleSubmit = async () => {
    const url = 'https://ragatnepal.com/api/feedback.php';
    const val = await AsyncStorage.getItem('contact');
    if (val !== null) {
      setContact(val);
      if (heading.length >= 6 && description.length >= 6) {
        callAPI(url, {
          topic: heading,
          description: description,
          contact: val,
        });
        navigation.navigate('PostFeedback');
      } else {
        alert('Input Feild too short');
      }
    } else {
      alert('Please Login First');
      navigation.navigate('Auth', { screen: 'Login' });
    }
  };
  return (
    <View style={[styles.container, { paddingHorizontal: Spacing.m }]}>
      <Header
        iconL="chevron-left"
        headerText="FeedBack"
        onPressL={navigation.goBack}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: Colors.white,
            borderRadius: 20,
            padding: Spacing.x,
          }}>
          <Text style={{ ...Fonts.h2, color: 'black' }}>
            We value your{' '}
            <Text style={{ color: Colors.primary }}>Feedback</Text>
          </Text>
          <TextInput
            placeholder="Topic"
            placeholderTextColor={Colors.darkGrey}
            onChangeText={(val) => setHeading(val)}
            style={{
              color: Colors.black,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              outline: 'none',
              backgroundColor: Colors.lightGrey,
              marginTop: Spacing.x,
            }}
          />

          <TextInput
            placeholder="Write your description here"
            placeholderTextColor={Colors.darkGrey}
            multiline={true}
            textAlignVertical="top"
            onChangeText={(val) => setDescription(val)}
            style={{
              color: Colors.black,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              height: 100,
              outline: 'none',
              backgroundColor: Colors.lightGrey,
              marginTop: Spacing.m,
            }}
          />
        </View>
        <Pressable
          onPress={handleSubmit}
          style={{
            marginHorizontal: Spacing.s,
            borderRadius: 20,
            padding: Spacing.m,
            width: '80%',
            alignItems: 'center',
            backgroundColor: Colors.primary,
            marginTop: Spacing.x,
          }}>
          <Text style={{ color: Colors.white }}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

function FeedBack() {
  return (
    <FeedbackStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="FeedbackInput">
      <FeedbackStack.Screen name="FeedbackInput" component={FeedbackInput} />
      <FeedbackStack.Screen name="PostFeedback" component={PostFeedBack} />
    </FeedbackStack.Navigator>
  );
}
export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
});
