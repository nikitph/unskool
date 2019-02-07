import React, { Component } from 'react'
import { Text, Image, View } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

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
          <View style={{padding: 40}}>
            <Button
              type='solid'
              icon={
                <Icon
                  name='arrow-right'
                  size={15}
                  color='white'
                  style={{paddingLeft: 15}}
              />
            }
              iconRight
              title='Get Started'
          />
          </View>

        </View>
      </View>
    )
  }
}
