import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
            <Text style={styles.titleText}>
              Welcome
            </Text>
            <Text style={styles.sectionText}>
Easily Connect with like-minded families & manage everything homeschool in one place
            </Text>
            <Image source={Images.family} style={styles.family} />
          </View>
          <View style={{padding: 20}}>
            <View
              style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <View style={{flex: 0.5}}>
                <Button
                  type='clear'
                  onPress={() => this.props.navigation.navigate('LoginScreen')}
                  icon={
                    <Icon
                      name='ios-log-in'
                      size={40}
                      color='grey'
                    />
                  }
                />
              </View>
              <View style={{flex: 0.5}}>

                <Button
                  type='clear'
                  onPress={() => this.props.navigation.navigate('SignUpScreen')}
                  icon={
                    <Icon
                      name='ios-people'
                      size={40}
                      color='grey'
                    />
                  }
                />
              </View>
            </View>
            <View
              style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <View style={{flex: 0.5}}>
                <Text style={styles.buttonTitle}>
                  LOGIN
                </Text>
              </View>
              <View style={{flex: 0.5}}>

                <Text style={styles.buttonTitle}>
                  SIGN UP
                </Text>
              </View>
            </View>
          </View>

        </View>

      </View>
    )
  }
}
