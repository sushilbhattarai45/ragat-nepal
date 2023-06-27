import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import callAPI from '../components/callAPI';

import Constants from 'expo-constants';
import { Colors, Spacing, Fonts } from '../components/Theme';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const EventPost = ({ caption, description, photo, date, time, address }) => {
  const [liked, setLiked] = React.useState(false);
  return (
    <View style={styles.eventPost}>
      <View style={{ paddingHorizontal: Spacing.m }}>
        <Text
          style={{
            ...Fonts.h4,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
          }}>
          {caption}
        </Text>
        <View style={styles.divider}></View>
        <Text
          style={{ ...Fonts.p1, color: Colors.darkGrey, letterSpacing: 1.6 }}>
          {description}
        </Text>
      </View>
      <View style={styles.imgContainer}>
        <Image
          style={{ resizeMode: 'cover', width:'100%',height:200 }}
          source={{ uri: photo }}
        />
      </View>
      <View style={[{ paddingHorizontal: Spacing.m }, styles.footer]}>
        <View>
          <View style={styles.eventInfoItem}>
            <Icon name="calendar" size={24} color={Colors.darkGrey} />
            <Text style={styles.eventInfoText}>{date}</Text>
          </View>
          <View style={styles.eventInfoItem}>
            <Icon name="clock-outline" size={24} color={Colors.darkGrey} />
            <Text style={styles.eventInfoText}>{time}</Text>
          </View>
          <View style={styles.eventInfoItem}>
            <Icon name="map-marker" size={24} color={Colors.darkGrey} />
            <Text style={styles.eventInfoText}>{address}</Text>
          </View>
        </View>
        <View>
          <Icon
            style={{ textAlign: 'center' }}
            selectable={false}
            name={liked ? 'star' : 'star-outline'}
            onPress={() => setLiked(!liked)}
            size={40}
            color="gold"
          />
          <Text style={{ textAlign: 'center', color: Colors.darkGrey }}>
            Intrested
          </Text>
        </View>
      </View>
    </View>
  );
};
const EventsScreen = ({ navigation }) => {
  const [eventList, setEventList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getPosts = async () => {
    const url = 'https://ragatnepal.com/api/eventsgetapi.php';
    setLoading(true);
    let res = await callAPI(url, {});
    res.errorstate ? alert(res.message) : null;
    setEventList(res.data);
    setLoading(false);
  };
  React.useEffect(() => {
    (async () => await getPosts())();
  }, []);
  return (
    <ScrollView style={{flex:1}}>
    <View style={{ paddingHorizontal: Spacing.m,marginTop:Spacing.m }}>
      <Header
        iconL="chevron-left"
        headerText="Events"
        onPressL={navigation.goBack}
      />
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, ]}>
         
      <View style={{ marginTop: Spacing.x }}>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 30 }}
            size={'large'}
            color={'red'}
          />
        ) : (
          eventList?.map((event) => {
            let { caption, description, photo, date, time, address } = event;
            return (
              <EventPost
                caption={caption}
                description={description}
                photo={photo}
                date={date}
                time={time}
                address={address}
              />
            );
          })
        )}
      </View>
    </ScrollView>
    </View>
    </ScrollView>
  );
};
export default EventsScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
  },
  eventPost: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.x,
    borderRadius: 20,
    marginBottom: Spacing.m,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.darkGrey,
    marginVertical: Spacing.s / 2,
  },
  imgContainer: {
    // height: 250,
    // backgroundColor: '#F2994A',
    marginVertical: Spacing.s,
  },
  eventInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventInfoText: {
    ...Fonts.p1,
    marginLeft: Spacing.s,
    color: Colors.darkGrey,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
