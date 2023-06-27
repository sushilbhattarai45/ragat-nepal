import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons';
import {Colors, Fonts} from './Theme';

const Header = ({bg=null, iconL, onPressL=null, iconR,onPressR=null, headerText})=>{
  const color = bg? Colors.white : Colors.black;
  return (
      <View style={styles.header}>
        {iconL && <Icon selectable={false} name={iconL} color={color} size={30} style={styles.headerLeft} onPress={onPressL}/>}
        {headerText && <Text style={[Fonts.h3, {color:color}]}>{headerText}</Text>}
        {iconR && <Icon selectable={false} name={iconR} color={color} size={30} style={styles.headerRight} onPress={onPressR} />}
      </View>
  );
}

export default Header;
const styles = StyleSheet.create({
  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    height:40,
    position:"relative",
    marginTop:Constants.statusBarHeight+8,
  },

  headerRight:{
    position:"absolute",
    right:0,
    top:5,
  },
  headerLeft:{
    position:"absolute",
    left:0,
    top:5,
  },
});