import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './style';

const ReviewHeader = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.lhsContainer}>
      <Icon size={30} name="arrowleft" color="#000" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.rhsContainer}>
      <Text style={styles.rhsTitle}>Save & Exit</Text>
    </TouchableOpacity>
  </View>
);

export default ReviewHeader;