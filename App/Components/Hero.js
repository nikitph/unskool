import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'

import style from './Styles/HeroStyle'
import styleVariables from '../Themes/Variables'
import Icon from 'react-native-vector-icons/Ionicons'
import globalStyles from '../Themes/GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'
import { Avatar, Badge } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import Star from './Star';

import styles from '../Containers/Styles/DashboardScreenStyle'

class Hero extends Component {
  static PropTypes = {
    guardian: PropTypes.object,
    nav: PropTypes.object,
    bVisible: PropTypes.boolean
  };

  headerIcon = (Icon, name, size) => (
    <TouchableOpacity style={styles.headerIconContainer}>
      <Icon name={name} size={size} color="#949BA1" />
    </TouchableOpacity>
  )

  render() {
    const guardian = this.props.guardian
    const { image, displayName, street, city, state, zipCode, uid } = guardian;
    const { payload } = this.props.user
    // handle the output of the required image
    let userImage = image !== ''
      ? { uri: image }
      : require('../Images/blank-profile-pic.png')

    // handle address output based on permissions (friends/admin only)
    let addressOutput =
      <View style={style.addressContainer}>
        <Text style={style.address}>{street}, {city}, </Text>
        <Text style={style.address}>{state}</Text>
        <Text style={style.address}> {zipCode}</Text>
      </View>

    return (
      <View style={style.container}>
        {/* <View className='profile-image'>
          <FastImage
            source={userImage}
            resizeMode='cover'
            style={{ width: Metrics.screenWidth, height: 300 }} />
          <LinearGradient
            style={style.mainInfo}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
          >
            <Text style={style.userName}>{displayName}</Text>
            <View style={style.hr} />
            {addressOutput}
          </LinearGradient>
        </View> */}
        <ImageBackground source={userImage} style={styles.imgBg}>
          <View style={styles.imgHeader}>
            <View style={styles.headerSubtitle}>
              <Text style={styles.imgHeaderTitle}>{displayName}
              </Text>
              <Star />
              {uid == payload.uid && (
                <TouchableOpacity style={[styles.headerIconContainer, { marginTop: 10 }]} onPress={() => this.props.nav.navigate('EditGuardianScreen')}>
                  <Icon name={'md-create'} size={20} color="#949BA1" />
                </TouchableOpacity>
              )}
              {uid != payload.uid && (
                <TouchableOpacity style={[styles.headerIconContainer, { marginTop: 10 }]} onPress={ () => this.props.nav.navigate('ChatScreen',{params: this.props.guardian}) }>
                  {/* <Icon name={'md-chat'} size={15} color="#949BA1" /> */}
                  <MaterialCommunityIcons name={'chat'} size={20} color="#949BA1" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* {uid !== payload.uid && (
            <>
              {this.headerIcon(MaterialCommunityIcons, "map-marker-distance", 20)}
              {this.headerIcon(Zocial, "call", 20)}
              {this.headerIcon(Zocial, "email", 20)}
              {this.headerIcon(Zocial, "googleplay", 15)}
            </>
          )} */}
        </ImageBackground>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.login
  }
}

export default connect(mapStateToProps, null)(Hero)


