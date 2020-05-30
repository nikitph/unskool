import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import style from './Styles/EventTeaserStyle'
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  ImageBackground
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import Carousel from 'react-native-snap-carousel'
import styleVariables from '../Themes/Variables'
import globalStyles from '../Themes/GlobalStyles'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button } from 'react-native-elements'
import Metrics from '../Themes/Metrics'

export default class EventTeaser extends Component {
  _renderItem({ item, index }) {
    const events = this.props.events || [' ']
    let teaserData = item
    console.log(item)
    const { gid, title, profileImage, date, startTime, finishTime } = teaserData
    const recurringDays = teaserData.recurringDays || []

    // handle the output of the image
    let eventImage = profileImage !== '../Images/logo.png'
      ? { uri: profileImage }
      : require('../Images/logo.png')

    return (<View style={style.teaserElement} key={teaserData.title}>
      <TouchableHighlight className='event-image' onPress={() => { }}>
        <ImageBackground
          source={eventImage}
          resizeMode='cover'
          style={style.teaserImage} />
      </TouchableHighlight>
      <View style={style.addEventContainer}>

        {
          !events &&
          <LinearGradient
            colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
            style={[globalStyles.addItem, style.editItem]}
          >
            <TouchableHighlight onPress={() => { }}>
              <Image
                source={require('../Images/edit.png')}
                resizeMode='cover'
                style={{ width: 40, height: 40 }} />
            </TouchableHighlight>
          </LinearGradient>
        }

        {
          !events &&
          <LinearGradient
            colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
            style={[globalStyles.addItem, style.addItem]}
          >
            <TouchableHighlight onPress={() => { }}>
              <Image
                source={require('../Images/plus-sign-white.png')}
                resizeMode='cover'
                style={{ position: 'relative', top: 2, left: 1, width: 35, height: 30 }} />
            </TouchableHighlight>
          </LinearGradient>
        }
      </View>
      <View style={style.eventView}>
        <Text style={style.eventTitle}>{title}</Text>
        <View style={style.eventTags}>
          {
            teaserData.ageRange &&
            teaserData.ageRange.map((item) => {
              return (
                <View className='tag-item' key={`${teaserData.title}${item}`}>
                  <Text style={style.tagItemCopy}>{item}</Text>
                </View>
              )
            })
          }
        </View>
        <View style={style.eventDays}>
          {
            // develop the view for recurring days ex: M/W/F
            // if there are no recurring days, show the date of the event
            recurringDays.map((item, index) => {
              if (recurringDays.length === 1 && item === ' ') {
                let stringDate = teaserData.startDate.split(' ').slice(0, 3).join(' ')
                return <View key={`${teaserData.title}${item}`}><Text style={style.eventDay}>{stringDate}</Text></View>
              } else if (index === 0 || index === 1) {
                return <View key={`${teaserData.title}${item}`}><Text style={style.eventDay}>{item}</Text></View>
              } else {
                return <View key={`${teaserData.title}${item}`}><Text style={style.eventDay}>/{item}</Text></View>
              }
            })
          }
        </View>
        <View className='time'><Text>{startTime} - {finishTime}</Text></View>
        <Button
          style={{ padding: 0 }}
          type='clear'
          onPress={() => this.props.nav.navigate('EditEventScreen', { eventData: item, ekey: item.ekey })}
          icon={
            <Icon
              name='ios-create'
              size={24}
              color='grey'
            ><Text style={{ fontSize: 16 }}>Edit Event</Text></Icon>
          }
        />
      </View>
    </View>)
  }

  render() {
    const props = this.props
    console.log(props)
    const events = props.events || [' ']
    const deviceWidth = Metrics.screenWidth
    let userData

    // if guardian is passed in the props, then show guardian data
    // instead of admin user data

    const teaserData = events[props.guardian.uid] || [' ']
    let teaserOutput = []
    let teaserElement
    let nullClass = ''
    let carData = []
    console.log(teaserData)


    // TODO: Check if generateTeasers within the Render method is causing excessive calls
    //
    // if the teaserData is undefined, output a fallback element
    if (teaserData[0] === ' ') {
      teaserOutput =
        <View style={{ justifyContent: 'center', width: deviceWidth - 40, height: 50 }}>
          <Text>
            Want to host? Add an event here
          </Text>
          <View style={{ top: -6, right: 0 }}>
            <TouchableHighlight onPress={() => { }}>
              <LinearGradient
                colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
                style={[globalStyles.addItem, style.addItem]}
              >
                <Image
                  source={require('../Images/plus-sign-white.png')}
                  resizeMode='cover'
                  style={{ top: 2, left: 1, width: 40, height: 40 }} />
              </LinearGradient>
            </TouchableHighlight>
          </View>
        </View>
      nullClass = 'null-teaser'
      console.log(carData)

    } else {
      for (let teaser in teaserData) {
        let data = { ekey: teaser, ...teaserData[teaser] }
        carData.push(data)
      }
    }

    // generate teaser based on the data passed to this function
    function generateTeasers() {
      for (let teaser in teaserData) {
        const { gid, title, profileImage, date, startTime, finishTime } = teaserData[teaser]
        const recurringDays = teaserData[teaser].recurringDays || []

        // handle the output of the image
        let eventImage = profileImage !== '../Images/logo.png'
          ? { uri: profileImage }
          : require('../Images/logo.png')

        teaserElement =
          <View style={style.teaserElement} key={teaser}>
            <TouchableHighlight className='event-image' onPress={() => { }}>
              <Image
                source={eventImage}
                resizeMode='cover'
                style={style.teaserImage} />
            </TouchableHighlight>
            <View style={style.addEventContainer}>

              {
                !events &&
                <LinearGradient
                  colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
                  style={[globalStyles.addItem, style.editItem]}
                >
                  <TouchableHighlight onPress={() => { }}>
                    <Image
                      source={require('../Images/edit.png')}
                      resizeMode='cover'
                      style={{ width: 40, height: 40 }} />
                  </TouchableHighlight>
                </LinearGradient>
              }

              {
                !events &&
                <LinearGradient
                  colors={[styleVariables.mc2purpleElectric, styleVariables.mc2BlueElectric]}
                  style={[globalStyles.addItem, style.addItem]}
                >
                  <TouchableHighlight onPress={() => { }}>
                    <Image
                      source={require('../Images/plus-sign-white.png')}
                      resizeMode='cover'
                      style={{ position: 'relative', top: 2, left: 1, width: 35, height: 30 }} />
                  </TouchableHighlight>
                </LinearGradient>
              }
            </View>
            <View style={style.eventView}>
              <Text style={style.eventTitle}>{title}</Text>
              <View style={style.eventTags}>
                {
                  teaserData[teaser].ageRange &&
                  teaserData[teaser].ageRange.map((item) => {
                    return (
                      <View className='tag-item' key={`${teaser}${item}`}>
                        <Text style={style.tagItemCopy}>{item}</Text>
                      </View>
                    )
                  })
                }
              </View>
              <View style={style.eventDays}>
                {
                  // develop the view for recurring days ex: M/W/F
                  // if there are no recurring days, show the date of the event
                  recurringDays.map((item, index) => {
                    if (recurringDays.length === 1 && item === ' ') {
                      let stringDate = teaserData[teaser].startDate.split(' ').slice(0, 3).join(' ')
                      return <View key={`${teaser}${item}`}><Text style={style.eventDay}>{stringDate}</Text></View>
                    } else if (index === 0 || index === 1) {
                      return <View key={`${teaser}${item}`}><Text style={style.eventDay}>{item}</Text></View>
                    } else {
                      return <View key={`${teaser}${item}`}><Text style={style.eventDay}>/{item}</Text></View>
                    }
                  })
                }
              </View>
              <View className='time'><Text>{startTime} - {finishTime}</Text></View>
            </View>
          </View>
        teaserOutput.push(teaserElement)
        carData.push(teaserData[teaser])
      }

      // if teaserOutput is empty after the array, fill it with an empty string value
      // this is to prevent the react-slick slider from throwing an undefined error
      teaserOutput = teaserOutput == [] ? [' '] : teaserOutput
    }

    return (
      <View style={style.teaserContainer}>
        <Text style={{ textAlign: 'center', paddingBottom: 20 }}>My Events</Text>
        {/* <Text style={style.userTitle}>My Events</Text> */}
        {/* <View style={style.br} /> */}
        <Carousel
          ref={(carousel) => { this._carousel = carousel }}
          data={carData}
          renderItem={this._renderItem.bind(this)}
          activeSlideAlignment={'start'}
          activeSlideOffset={20}
          inactiveSlideShift={-10}
          layout={'default'}
          sliderWidth={deviceWidth - 40} // make the sliderWidth and itemWidth equivalent to make it left align
          itemWidth={deviceWidth - 100} // subtract 40 for item's left and right padding
        />
      </View>
    )
  }
}
