import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styleVariables from '../../Themes/Variables';
import styles from './style';

const ReviewBottomButton = ({ title, onPress }) => (
  <LinearGradient
    colors={["#7B5A78", "#C29688"]}
    start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
    style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  </LinearGradient>
)

export default ReviewBottomButton;