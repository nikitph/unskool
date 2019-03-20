import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import * as Animatable from 'react-native-animatable'
import Hero from '../Components/Hero'
import EventTeaser from '../Components/EventTeaser'
import Summary from '../Components/Summary'
import FooterNav from '../Components/FooterNav'
// Styles
import styles from './Styles/ViewGuardianScreenStyle'

class ViewGuardianScreen extends Component {
  static navigationOptions = {
    headerTitle: <Animatable.Image animation='fadeIn' source={Images.launch} style={{ width: 40, height: 40 }}
    />
  };
  render () {
    console.log(this.props)
    let guardian = this.props.navigation.state.params
    return (
      <Animatable.View style={styles.container} animation='fadeIn'>
        <View >
          <Hero
            guardian={guardian} nav={this.props.navigation} bVisible={false} />
        </View>
        <ScrollView>
          <View style={{flex: 0.3}}>
            <Summary guardian={guardian} nav={this.props.navigation} bVisible={false} />
          </View>
          {/* <View style={{paddingBottom: 120}}> */}
          {/* <EventTeaser guardian={this.props.guardian} events={this.props.events} /> */}
          {/* </View> */}
        </ScrollView>
        <FooterNav navigation={this.props.navigation} />
      </Animatable.View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewGuardianScreen)
