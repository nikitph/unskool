import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './style';
import { Images, Colors } from '../../Themes';
import Star from '../../Components/Star';
import Likes from '../../Components/Likes';
import { scale } from '../../Themes/ScalingUtils';
import FriendsTabs from '../../Components/FriendsTabs';

const DATA = ["English", "Mandarian", "Piano"];

export default class FriendReview extends React.Component {

  skills = ({ item }) => (
    <TouchableOpacity style={styles.skillList}>
      <Text style={styles.skillName}>{item}</Text>
    </TouchableOpacity>
  )

  skillFooter = () => (
    <TouchableOpacity style={styles.skillList}>
      <MaterialCommunityIcons size={40} color="#fff" name="dots-horizontal" />
    </TouchableOpacity>
  )

  userFooterContainer = () => (
    <TouchableOpacity style={styles.userItemContainer}>
      <Image style={[styles.userImg, {
        tintColor: 'rgba(0,0,0,0.1)'
      }]} source={Images.more} />
    </TouchableOpacity>
  )

  usersList = (title) => {
    return (
      <View style={styles.userListContainer}>
        <Text style={styles.userTitle}>{title}</Text>
        <View style={styles.br} />
        <FlatList
          data={[1, 2, 3, 4]}
          horizontal
          renderItem={this.user}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={{ paddingLeft: scale(15) }}
          ListFooterComponent={this.userFooterContainer}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }

  user = () => (
    <TouchableOpacity style={styles.userItemContainer}>
      <Image style={styles.userImg} source={Images.child} />
      <Text style={styles.userName}>Liza</Text>
    </TouchableOpacity>
  )
  headerIcon = (Icon, name, size) => (
    <TouchableOpacity style={styles.headerIconContainer}>
      <Icon name={name} size={size} color="#949BA1" />
    </TouchableOpacity>
  )

  keyExtractor = (d, i) => i.toString();

  render() {

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <ImageBackground source={Images.family} style={styles.imgBg}>
          <View style={styles.imgHeader}>
            <Text style={styles.imgHeaderTitle}>Chris & Sally Smith</Text>
          </View>
          {this.headerIcon(MaterialCommunityIcons, "map-marker-distance", 20)}
          {this.headerIcon(Zocial, "call", 20)}
          {this.headerIcon(Zocial, "email", 20)}
          {this.headerIcon(Zocial, "googleplay", 15)}
        </ImageBackground>
        <View style={styles.detailsContainer}>
          <View style={styles.likesContainer}>
            <Star />
            <Likes style={{ marginLeft: scale(20) }} />
          </View>
          <LinearGradient colors={Colors.gradient} start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }} style={styles.disconnectButton}>
            <TouchableOpacity>
              <Text style={styles.disconnectTitle}>Disconnect</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <Text style={styles.details}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
        <FlatList
          data={DATA}
          horizontal
          keyExtractor={this.keyExtractor}
          renderItem={this.skills}
          ListFooterComponent={this.skillFooter}
          contentContainerStyle={{ paddingLeft: scale(15) }}
          showsHorizontalScrollIndicator={false}
        />
        {this.usersList("Children")}
        {this.usersList("Guardian")}
        {this.usersList("Community friends")}
        <FriendsTabs />
      </ScrollView>
    )
  }
}