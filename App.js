import React from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import FindADonorScreen from './screens/FindADonorScreen';
import EventsScreen from './screens/EventsScreen';
import ProfileScreen from './screens/ProfileScreen';
import PhoneAuthScreen from './screens/LoginScreen';  
import Feedback from './screens/FeedBack';
import Contact from './screens/Contact';
import DrawerContent from './screens/Drawer';
import Messages from './screens/notifi';
import Splash from './screens/splash';
import PhoneOtpScreen from './screens/OTPScreen';      
import SignUp from './screens/SignUpScreen';    
import ProfileEdit from './screens/ProfileEdit';  
          
import Report from './screens/Report';
 
import { Colors, Spacing, Fonts } from './components/Theme';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Drawer = createDrawerNavigator();
function Profile() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="ProfileEdit" component={ProfileEdit} />
    </ProfileStack.Navigator>
  );
}
function HomeNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home-outline"
              size={size}
              color={focused ? Colors.primary : Colors.darkGrey}
            />
          ),
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="account"
              size={size}
              color={focused ? Colors.primary : Colors.darkGrey}
            />
          ),
          title: 'Profile',
        }}
      />

      <Drawer.Screen
        name="Messages"
        component={Messages}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="message"
              size={size}
              color={focused ? Colors.primary : Colors.darkGrey}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Events"
        component={EventsScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="calendar"
              size={size}
              color={focused ? Colors.primary : Colors.darkGrey}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FindADonor"
        component={FindADonorScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="account-search"
              size={size}
              color={focused ? Colors.primary : Colors.darkGrey}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="phone-outline"
              size={size}
              color={focused ? Colors.primary : Colors.darkGrey}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={Feedback}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="forum"
              size={size}
              color={focused ? Colors.primary : Colors.darkGrey}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Report"
        component={Report}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="information"
              size={size}
              color={focused ? Colors.primary : Colors.darkGrey}
            />
          ),
        }}
      />

      
    </Drawer.Navigator>
  );
}
function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={PhoneAuthScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Otp" component={PhoneOtpScreen} />
    </Stack.Navigator>
  );
}

//984-6761072
function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const App = () => {
  return <AppStack />;
};
export default App;
