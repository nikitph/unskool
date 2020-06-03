import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { scale } from '../../Themes/ScalingUtils';
import { Fonts } from '../../Themes';

const Star = ({ fill = 4.8, style }) => (
  <TouchableOpacity style={[styles.container, style]} activeOpacity={1}>
    <Entypo name="star" size={25} color="#EE5B36" />
    <Text style={styles.title}>{fill}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: scale(5),
    color: "#EE5B36",
    fontSize: scale(18),
    fontFamily: Fonts.type.base,
  },
})

export default Star;