import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

import style from './Styles/HeroStyle'
import styleVariables from '../Themes/Variables'
import globalStyles from '../Themes/GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import { Images, Metrics } from '../Themes'

class Hero extends Component {
  static PropTypes={
    guardian: PropTypes.object,
    nav: PropTypes.object
  };

  render () {
    const guardian = this.props.guardian
    const { image, displayName, street, city, state, zipCode } = guardian

    // handle the output of the required image
    let userImage = image !== ''
      ? {uri: image}
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
        <View className='profile-image'>
          <FastImage
            source={userImage}
            resizeMode='cover'
            style={{width: Metrics.screenWidth, height: 320}} />
          <LinearGradient
            style={style.mainInfo}
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
          >
            <Text style={style.userName}>{ displayName }</Text>
            <View style={style.hr} />
            { addressOutput }
            {/* <TouchableOpacity onPress={ () => {}}>
              <LinearGradient
                style={[style.chatButton]}
                colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
              >
                <Image
                  source={require('../Images/chatone.png')}
                  resizeMode='cover'
                  style={style.chatIcon} />
              </LinearGradient>
            </TouchableOpacity> */}
          </LinearGradient>
        </View>
        <LinearGradient
          colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
          style={style.edit}
        >
          <TouchableOpacity onPress={() => { this.props.nav.navigate('EditGuardianScreen')}} className='add-item-button edit-profile-button'>
            <Image
              source={require('../Images/edit.png')}
              resizeMode='cover'
              style={{width: 60, height: 60}} />
          </TouchableOpacity>
        </LinearGradient>
        <View style={style.decoClip} />
      </View>
    )
  }
}

export default Hero
