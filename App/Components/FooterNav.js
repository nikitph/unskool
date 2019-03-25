import React, { Component } from 'react'
import {
  View
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import styleVariables from '../Themes/Variables'
// import PropTypes from 'prop-types';
import style from './Styles/FooterNavStyle'
import Link from '../Components/Link'

class FooterNav extends Component {
  render () {
    const iconStyles = {width: 100, height: 60, marginBottom: -15, marginTop: -10}
    const browseHostsIconStyles = {width: 80, height: 60, marginBottom: -8, marginTop: -10, position: 'relative', top: -5}
    const feedbackIcon = {height: 45, width: 60}
    const chatIcon = {height: 45, width: 60}


    // get the current scene
    const props = this.props
    const { navigation } = props
    let currentScene = 'DashboardScreen'

    function checkScene (scene) {
      let chosenIcon
      currentScene === scene
        ? chosenIcon = icons[scene][1]
        : chosenIcon = icons[scene][0]
      return chosenIcon
    }

    const icons = {

      Dashboard: [ require('../Images/home-blue.png'), require('../Images/home-purp.png') ],
      Calendar: [ require('../Images/calander-blue.png'), require('../Images/calender-purp.png') ],
      BrowseHosts: [ require('../Images/globe-blue.png'), require('../Images/globe-purple.png') ],
      Chat: [ require('../Images/chat_gray.png'), require('../Images/chat_blue.png') ],
      Feedback: [ require('../Images/feedback-blue.png'), require('../Images/feedback-purp.png') ]

    }

    return (
      <View style={style.container}>
        <LinearGradient
          colors={['white', 'white']}
          style={[style.footerNav]}
        >
          <Link
            extraStyle={style.footerLink}
            textStyles={style.footerLinkCopy}
            onClick={() => navigation.navigate('DashboardScreen')}
            iconTop={{url: checkScene('Dashboard'), dimensions: iconStyles }}
            text='HOME' />
          <Link
            extraStyle={style.footerLink}
            textStyles={style.footerLinkCopy}
            onClick={() => navigation.navigate('DashboardScreen')}
            iconTop={{url: checkScene('Calendar'), dimensions: iconStyles }}
            text='CALENDAR' />
          <Link
            extraStyle={style.footerLink, style.browseHostsLink}
            textStyles={style.footerLinkCopy}
            onClick={() => this.props.navigation.navigate('BrowseHostsScreen')}
            iconTop={{url: checkScene('BrowseHosts'), dimensions: browseHostsIconStyles }}
            text='BROWSE HOSTS' />
          <Link
            extraStyle={style.footerLink}
            textStyles={style.footerLinkCopy}
            onClick={() => navigation.navigate('DashboardScreen')}
            iconTop={{url: checkScene('Chat'), dimensions: chatIcon }}
            text='CHAT' />
          <Link
            extraStyle={style.footerLink}
            textStyles={style.footerLinkCopy}
            onClick={() => this.props.navigation.navigate('FeedbackFormScreen')}
            iconTop={{url: checkScene('Feedback'), dimensions: feedbackIcon }}
            text='FEEDBACK' />
        </LinearGradient>
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'white']}
          style={style.decoCurve}
          locations={[1, 1]}
         />
      </View>
    )
  }
}

export default FooterNav
