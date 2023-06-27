import React from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Header from '../components/Header';
import { Colors, Spacing, Fonts } from '../components/Theme';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const BloodGroupsSlider = ({onSelect=()=>{null}}) => {
 const BloodGroups =  ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const [selectedBlood, setSelectedBlood] = React.useState(BloodGroups[0]);
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ borderRadius: 8 }}>
      {BloodGroups.map((item, i) => {
        const color = item === selectedBlood ? Colors.white : Colors.primary;
        const bg = item === selectedBlood ? Colors.primary : Colors.white_light;
        return (
          <Pressable
            key={i}
            onPress={()=>{setSelectedBlood(item);onSelect()}}
            style={[styles.bloodGroupItem, { backgroundColor: bg }]}>
            <Text selectable={false} style={{ ...Fonts.h4, color: color }}>{item}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};
export default BloodGroupsSlider;
const styles = StyleSheet.create({
  bloodGroupItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    marginRight: 16,
    borderRadius: 8,
  },
});
