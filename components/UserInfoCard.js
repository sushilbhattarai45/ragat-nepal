import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Colors, Spacing, Fonts } from '../components/Theme';

const UserInfoCard = ({ name, address, phno, bloodGroup, donations, style}) => {
  return (
    <View style={{...styles.profileCard, ...style}}>
      <Text style={{ ...Fonts.h2, color: Colors.white }}>{name}</Text>
      <View style={styles.row}>
        <Text style={{ ...Fonts.p1, color: Colors.lightGrey }}>{address}</Text>
        <Text style={{ ...Fonts.p1, color: Colors.lightGrey }}>{phno}</Text>
      </View>
      <View style={styles.majorInfo}>
        <View>
          <Text
            style={{ ...Fonts.h1, color: Colors.white, textAlign: 'center' }}>
            {bloodGroup}
          </Text>
          <Text
            style={{ ...Fonts.p1, color: Colors.white, textAlign: 'center' }}>
            Blood Group
          </Text>
        </View>
        <View style={styles.divider}></View>
        <View>
          <Text
            style={{ ...Fonts.h1, color: Colors.white, textAlign: 'center' }}>
            {donations}
          </Text>
          <Text
            style={{ ...Fonts.p1, color: Colors.white, textAlign: 'center' }}>
            Donations
          </Text>
        </View>
      </View>
    </View>
  );
};
export default UserInfoCard;
const styles = StyleSheet.create({
    profileCard: {
    marginTop: Spacing.x,
    paddingVertical: Spacing.x,
    paddingHorizontal: Spacing.m,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  majorInfo: {
    marginTop: Spacing.s,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  divider: {
    width: 1,
    backgroundColor: Colors.lightGrey,
  },
})