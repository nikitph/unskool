import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import * as Animatable from 'react-native-animatable'
import Hero from '../Components/Hero'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DashboardScreenStyle'

class DashboardScreen extends Component {
  static navigationOptions = {
    headerTitle: <Animatable.Image animation='rotate' duration='9000' iterationCount='infinite' source={Images.launch}       style={{ width: 40, height: 40 }}
    />
  };
  render () {
    console.log(this.props)
    return (
      <ScrollView>
        <Animatable.View animation="fadeInLeft">
        <Hero
          guardian={this.props.guardian} />
        </Animatable.View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    guardian: state.login.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)
