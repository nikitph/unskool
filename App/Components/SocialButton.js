import React from "react";
import { TouchableOpacity, Text } from "react-native";
import style from "./Styles/SocialButtonStyle";
import Icon from "react-native-vector-icons/Ionicons";

export const SocialButton = props => {
  return (
    <TouchableOpacity
      style={[style.socialLoginbutton, props.containerStyle]}
      onPress={props.onPress} >
      <Icon name={props.icon} size={30} color={props.iconColor} />
      <Text style={[style.facebookText,props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};
