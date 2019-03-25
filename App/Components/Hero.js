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
import Icon from 'react-native-vector-icons/Ionicons'
import globalStyles from '../Themes/GlobalStyles'
import LinearGradient from 'react-native-linear-gradient'
import { Avatar, Badge } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { Images, Metrics } from '../Themes'
import ActionButton from 'react-native-action-button'
import styles from '../Containers/Styles/DashboardScreenStyle'

class Hero extends Component {
  static PropTypes={
    guardian: PropTypes.object,
    nav: PropTypes.object,
    bVisible: PropTypes.boolean
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
            style={{width: Metrics.screenWidth, height: 300}} />
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
        <View style={style.decoClip} />
        { !this.props.bVisible && <TouchableOpacity onPress={ () => {} }>
          <LinearGradient
            style={[style.chatButton, globalStyles.addItem]}
            colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
          >
            <Image
              source={require('../Images/chatone.png')}
              resizeMode='cover'
              style={style.chatIcon} />
          </LinearGradient>
        </TouchableOpacity>}
        { this.props.bVisible && <ActionButton buttonColor='rgba(231,76,60,0.8)' offsetX={10}>
          <ActionButton.Item buttonColor='#9b59b6' title='New Event' onPress={() => this.props.nav.navigate('CreateEventScreen')}>
            <Icon name='md-calendar' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title='Add Child' onPress={() => this.props.nav.navigate('CreateChildScreen')}>
            <Icon name='md-person-add' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='green' title='Edit profile' onPress={() => this.props.nav.navigate('EditGuardianScreen')}>
            <Icon name='md-create' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>}
      </View>
    )
  }
}

export default Hero
