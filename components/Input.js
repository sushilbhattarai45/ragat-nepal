import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";
import { Colors, Spacing, Fonts } from "./Theme";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const Input = ({
  icon,
  style,
  placeholder,
  onChangeText,
  error,
  type,
  touched,
  ...props
}) => {
  return (
    <View
      elevation={5}
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: Colors.white,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        paddingVertical: 16,
        paddingHorizontal: 24,
        marginBottom: Spacing.m,
        ...style,
      }}
    >
      <Icon
        name={icon}
        size={24}
        color={
          !touched ? Colors.darkGrey : error ? Colors.primary : Colors.darkGrey
        }
      />
      <TextInput
        keyboardType={type}
        placeholder={placeholder}
        style={{
          fontSize: 16,
          marginHorizontal: 8,
          width: "90%",
          paddingLeft: 0,
          color: !touched
            ? Colors.darkGrey
            : error
            ? Colors.primary
            : Colors.darkGrey,

          outline: "none",
        }}
        {...props}
        onChangeText={onChangeText}
      />
    </View>
  );
};
export default Input;
