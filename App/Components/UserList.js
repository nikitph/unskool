import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './Styles/UserListStyle';
import { scale } from '../Themes/ScalingUtils';
import { Images, Colors } from '../Themes';

const user = ({ item = {} }) => {
  const { fName = "", profileImage = "" } = item;

  return (
    <TouchableOpacity style={styles.userItemContainer}>
      <Image style={styles.userImg} source={{ uri: profileImage }} />
      <Text style={styles.userName}>{fName}</Text>
    </TouchableOpacity>
  )
}

const keyExtractor = (d, i) => i.toString();


const UsersList = ({ title, data, addNewChild }) => {
  return (
    <View style={styles.userListContainer}>
      <Text style={styles.userTitle}>{title}</Text>
      <View style={styles.br} />
      <FlatList
        data={data}
        horizontal
        renderItem={user}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingLeft: scale(15) }}
        ListFooterComponent={() => {
          if (isCurrentUser) {
            return (
              <TouchableOpacity style={styles.userItemContainer} onPress={() => addNewChild()}>
                <Image style={[styles.userImg, {
                  tintColor: 'rgba(0,0,0,0.1)'
                }]} source={Images.more} />
              </TouchableOpacity>
            )
          }
          return null
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default UsersList;