import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import * as Animatable from 'react-native-animatable'
import Hero from '../Components/Hero'
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
        <View style={{flex: 0.3}}>
          <Summary guardian={this.props.guardian} />
        </View>
        <FooterNav navigation={this.props.navigation} />
        <ActionButton buttonColor='rgba(231,76,60,1)' offsetY={100}>
          <ActionButton.Item buttonColor='#9b59b6' title='New Event' onPress={() => this.props.navigation.navigate('CreateEventScreen')}>
            <Icon name='md-calendar' style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title='Add Child' onPress={() => this.props.navigation.navigate('CreateChildScreen')}>
            <Icon name='md-person-add' style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Animatable.View>
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
