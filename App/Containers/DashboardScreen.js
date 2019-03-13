import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import * as Animatable from 'react-native-animatable'
import Hero from '../Components/Hero'
import EventTeaser from '../Components/EventTeaser'
import Summary from '../Components/Summary'
import FooterNav from '../Components/FooterNav'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import PhotoUpload from '../Components/PhotoUpload'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DashboardScreenStyle'

class DashboardScreen extends Component {
  static navigationOptions = {
    headerTitle: <Animatable.Image animation='rotate' duration='9000' source={Images.launch} style={{ width: 40, height: 40 }}
    />
  };
  render () {
    console.log(this.props)
    return (
      <Animatable.View style={styles.container} animation='fadeIn'>
          <View >
            <Hero
              guardian={this.props.guardian} nav={this.props.navigation} />
          </View>
        <ScrollView>
          <View style={{flex: 0.3}}>
            <Summary guardian={this.props.guardian} nav={this.props.navigation} />
          </View>
          <View style={{paddingBottom: 120}}>
            <EventTeaser guardian={this.props.guardian} events={this.props.events} />
          </View>
        </ScrollView>
        <FooterNav navigation={this.props.navigation} />
      </Animatable.View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    guardian: state.login.payload,
    events: state.browsehosts.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)
