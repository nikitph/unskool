import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { scale } from '../Themes/ScalingUtils';
import { Fonts } from '../Themes';

const Likes = ({ likes = 12, style, name = "like2", color = "#6F6F6F" }) => (
  <TouchableOpacity style={[styles.container, style]} activeOpacity={1}>
    <AntDesign name={name} size={25} color={color} />
    <Text style={styles.title}>{likes}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: scale(5),
    color: "#6F6F6F",
    fontSize: scale(18),
    fontFamily: Fonts.type.base,
  },
})

export default Likes;