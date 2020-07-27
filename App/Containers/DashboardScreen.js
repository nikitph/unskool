import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import { Images } from '../Themes'
import * as Animatable from 'react-native-animatable'
import Hero from '../Components/Hero'
import EventTeaser from '../Components/EventTeaser'
import Summary from '../Components/Summary'
import FooterNav from '../Components/FooterNav'
import FriendsTabs from '../Components/FriendsTabs';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DashboardScreenStyle'
import { scale } from '../Themes/ScalingUtils'

class DashboardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Image animation='fadeIn' source={Images.launch} style={{ width: 40, height: 40 }} />,
      headerLeft: <TouchableOpacity style={[styles.headerIconContainer, { margin: 10 }]}
        onPress={() => {
          navigation.toggleDrawer();
        }
        }>
        <Icon
          name='ios-menu'
          size={24}
          color='grey'
        />
      </TouchableOpacity>
    }
  };
  render() {
    return (
      <Animatable.View style={styles.container} animation='fadeIn'>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: scale(120) }}>
          {this.props.guardian && (
            <>
              <Hero
                guardian={this.props.guardian} nav={this.props.navigation} bVisible />
              <Summary guardian={this.props.guardian} nav={this.props.navigation} bVisible />
              <EventTeaser guardian={this.props.guardian} events={this.props.events} nav={this.props.navigation} />
              <FriendsTabs />
            </>
          )}

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
