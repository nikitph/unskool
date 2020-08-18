import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView, TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import Carousel from 'react-native-snap-carousel'
import LinearGradient from 'react-native-linear-gradient'
import Link from '../Components/Link'
import style from './Styles/BrowseHostsScreenStyle'
import Metrics from '../Themes/Metrics'
import SingleGuardianActions from '../Redux/SingleGuardianRedux'
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay'
import { Images } from '../Themes'
import * as Animatable from 'react-native-animatable'
import styles from './Styles/ViewGuardianScreenStyle'

class BrowseHostsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Animatable.Image animation='fadeIn' source={Images.launch} style={{width: 40, height: 40}}
      />,
      headerRight: <TouchableOpacity style={[styles.headerIconContainer, {margin: 10}]}

                                     onPress={() => navigation.navigate('SearchScreen')}>
        <MaterialCommunityIcons name={'account-search-outline'} size={24} color="grey"/>

      </TouchableOpacity>
      ,
      headerBackTitle: ' '
    }
  }
  render() {
    const props = this.props
    const deviceWidth = Metrics.screenWidth
    const eventData = this.props.events || [' ']

    // this array stores the template elements ex: the event post
    let hostEventsOutput = []
    let teaserOutput = []
    let carData = []
    let teaserElement

    // loop through each guardian group of events
    for (let teaserGroup in eventData) {
      teaserOutput = []
      carData = []
      // set vars at this scope to be used in the hostEventsOutput
      let eventHostName
      let guardianid = ''
      let isGuardianSponsorer = false

      // iterate through each host event within the current group
      for (let teaser in eventData[teaserGroup]) {
        let teaserData = eventData[teaserGroup][teaser]
        const recurringDays = teaserData.recurringDays || []
        const { hostName, title, image, startTime, finishTime, gid, latlong = { lat: 90.000, lng: 0.000 }, sponsored = false } = teaserData
        guardianid = gid
        isGuardianSponsorer = sponsored

        // filter out events belonging to user
         if (gid === props.guardian.uid) { continue }

        // set the gid for the scope above
        const ageRange = teaserData.ageRange || []
        eventHostName = hostName

        // handle the output of the image
        let eventImage
        let imageStyle

        if (image === '../Images/logo.png' || image === '') {
          eventImage = require('../Images/logo.png')
          imageStyle = { width: 150, height: 150 }
        } else {
          eventImage = { uri: image, cache: 'force-cache' }
          imageStyle = style.teaserImage
        }

        teaserElement =
          <View style={style.teaserContainer} id={teaser} key={teaser}>
            <TouchableHighlight
            >
              <Image
                source={eventImage}
                resizeMode='cover'
                style={imageStyle} />
            </TouchableHighlight>
            <LinearGradient
              style={style.eventView}
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
            >
              {
                // toggleSeatBooking &&
                // <View onClick={ () => toggleSeatBooking() } className="add-item-button drop-off">
                //   <FaChild/>
                // </View>
              }
              <Text style={style.title}>{title}</Text>
              <View style={style.tags}>
                {
                  ageRange.map((item) => {
                    return (
                      <View style={style.bulletAndTagItem} key={`${teaser}${item}`}>
                        <View style={style.bullet} />
                        <Text style={style.tagItem}>{item}</Text>
                      </View>
                    )
                  })
                }
              </View>
              <View style={style.dayAndTime}>
                <View style={style.days}>
                  {
                    recurringDays.map((item, index) => {
                      // conditionals for handling the various output for the recurring days
                      if (recurringDays.length === 1 && item === ' ') {
                        let stringDate = teaserData.startDate.split(' ').slice(0, 3).join(' ')
                        return <Text style={style.dayText} key={`${teaser}${item}`}>{stringDate}</Text>
                      } else if (index === 0) {
                        return <Text style={style.dayText} key={`${teaser}${item}`}>{item}</Text>
                      } else {
                        return <Text style={style.dayText} key={`${teaser}${item}`}>/{item}</Text>
                      }
                    })
                  }
                </View>
                <View style={style.time}><Text style={style.timeText}>{startTime} - {finishTime}</Text></View>
              </View>
            </LinearGradient>
          </View>
        teaserOutput.push(teaserElement)
        carData.push(teaserData)
      }

      if (teaserOutput.length > 0) {
        isGuardianSponsorer ? hostEventsOutput.unshift(
          <View className='event-container' key={`${teaserGroup}`}>
            <Link
              extraStyle={style.hostName}
              textStyles={style.hostNameText}
              text={eventHostName} />
            <Carousel
              className='host-events'
              ref={(carousel) => { this._carousel = carousel }}
              sliderWidth={deviceWidth - 40} // make the sliderWidth and itemWidth equivalent to make it left align
              itemWidth={deviceWidth - 40} // subtract 40 for item's left and right padding
            >
              {teaserOutput}
            </Carousel>
          </View>
        )
          : hostEventsOutput.push(
            <View className='event-container' key={`${teaserGroup}`}>
              <Link
                extraStyle={style.hostName}
                textStyles={style.hostNameText}
                onClick={() => this.props.getGuardian(guardianid, this.props.navigation)}
                text={eventHostName} />
              <Carousel
                className='host-events'
                data={carData}
                renderItem={this._renderItem.bind(this)}
                ref={(carousel) => { this._carousel = carousel }}
                sliderWidth={deviceWidth - 40} // make the sliderWidth and itemWidth equivalent to make it left align
                itemWidth={deviceWidth - 100} // subtract 40 for item's left and right padding
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.7}
                layout={'stack'} layoutCardOffset={40}
                autoplay
              />
            </View>
          )
      }
    }

    // if hostEventsOutput is empty after the array, fill it with an empty string value
    // this is to prevent the react-slick slider from throwing an undefined error
    hostEventsOutput = hostEventsOutput === [] ? [' '] : hostEventsOutput

    // OUTPUT THE EVENTS
    //
    //
    return (
      <ScrollView style={style.container}>
        {hostEventsOutput.length > 0 ? hostEventsOutput : <View style={{
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <Text style={{ color: 'black', fontFamily: 'AvenirNext-UltraLight', fontSize: 16, alignSelf: 'center' }}>
            No Hosts currently in your area,</Text>
          <Link
            textStyles={{ color: 'blue', fontFamily: 'AvenirNext-UltraLight', fontSize: 16 }}
            text='click here' /><Text style={{ color: 'black', fontFamily: 'AvenirNext-UltraLight', fontSize: 16, textAlign: 'center' }}>
            to share the app to potential hosts to build our community in your area!</Text>
        </View>}
        <OrientationLoadingOverlay
          visible={this.props.fetching}
          color='white'
          indicatorSize='large'
          messageFontSize={24}
          message='Loading Guardian'
        />
      </ScrollView>
    )
  }
  _renderItem({ item, index }) {
    let teaserData = item
    const recurringDays = teaserData.recurringDays || []
    const { hostName, title, image, startTime, finishTime, gid, latlong = { lat: 90.000, lng: 0.000 }, sponsored = false } = teaserData
    let guardianid = gid
    let isGuardianSponsorer = sponsored

    // filter out events belonging to user
    // if (gid === props.guardian.uid) { continue }

    // set the gid for the scope above
    const ageRange = teaserData.ageRange || []
    let eventHostName = hostName

    // handle the output of the image
    let eventImage
    let imageStyle

    if (image === '../Images/logo.png' || image === '' || image === '') {
      eventImage = require('../Images/logo.png')
      imageStyle = { width: 150, height: 150 }
    } else {
      eventImage = { uri: image, cache: 'web' }
      imageStyle = style.teaserImage
    }

    return (<View style={style.teaserContainer} id={eventHostName} key={eventHostName}>
      <TouchableHighlight onPress={() => this.props.navigation.navigate('ViewEventScreen', { item })}
      >
        <FastImage
          source={eventImage}
          resizeMode='cover'
          style={imageStyle} />
      </TouchableHighlight>
      <LinearGradient
        style={style.eventView}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
      >
        {
          // toggleSeatBooking &&
          // <View onClick={ () => toggleSeatBooking() } className="add-item-button drop-off">
          //   <FaChild/>
          // </View>
        }
        <Text style={style.title}>{title}</Text>
        <View style={style.tags}>
          {
            ageRange.map((item) => {
              return (
                <View style={style.bulletAndTagItem} key={`${eventHostName}${item}`}>
                  <View style={style.bullet} />
                  <Text style={style.tagItem}>{item}</Text>
                </View>
              )
            })
          }
        </View>
        <View style={style.dayAndTime}>
          <View style={style.days}>
            {
              recurringDays.map((item, index) => {
                // conditionals for handling the various output for the recurring days
                if (recurringDays.length === 1 && item === ' ') {
                  let stringDate = teaserData.startDate.split(' ').slice(0, 3).join(' ')
                  return <Text style={style.dayText} key={`${eventHostName}${item}`}>{stringDate}</Text>
                } else if (index === 0 ) {
                  return <Text style={style.dayText} key={`${eventHostName}${item}`}>{item}</Text>
                } else {
                  return <Text style={style.dayText} key={`${eventHostName}${item}`}>/{item}</Text>
                }
              })
            }
          </View>
          <View style={style.time}><Text style={style.timeText}>{startTime} - {finishTime}</Text></View>
        </View>
      </LinearGradient>
    </View>)
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.browsehosts.payload,
    guardian: state.login.payload,
    fetching: state.singleguardian.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGuardian: (gid, nav) => dispatch(SingleGuardianActions.singleGuardianRequest(gid, nav))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseHostsScreen)
