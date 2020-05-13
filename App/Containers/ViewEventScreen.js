import React, { Component } from 'react'
import { ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ViewEventScreenStyle'
import style from './Styles/BrowseHostsScreenStyle'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { Metrics } from '../Themes'
import styleVariables from '../Themes/Variables'
import { Badge } from 'react-native-elements'

class ViewEventScreen extends Component {
  render () {
    console.log(this.props.navigation.state.params)
    let teaserData = this.props.navigation.state.params.item
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
      imageStyle = {width: 150, height: 150}
    } else {
      eventImage = {uri: image, cache: 'web'}
      imageStyle = style.teaserImage
    }
    return (
      <ScrollView style={styles.container}>
        <View style={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: styleVariables.mc2purpleElectric,
          width: Metrics.screenWidth,
          height: 300
        }} id={eventHostName} key={eventHostName}>
          <TouchableHighlight>
            <FastImage
              source={eventImage}
              resizeMode='cover'
              style={{width: Metrics.screenWidth, height: 300}}/>
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
          </LinearGradient>
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.tags}>

            {
              ageRange.map((item) => {
                return (
                  <View style={styles.bulletAndTagItem} key={`${eventHostName}${item}`}>
                    <View style={styles.bullet}>
                      <Badge value={item} status='primary' textStyle={styles.tagItem} badgeStyle={styles.badgeContainer}
                             containerStyle={styles.badgeContainer}/>
                    </View>
                  </View>
                )
              })
            }
          </View>
          <View style={styles.dayAndTime}>
            <View style={styles.days}>
              {
                recurringDays.map((item, index) => {
                  // conditionals for handling the various output for the recurring days
                  if (recurringDays.length === 1 && item === ' ') {
                    let stringDate = teaserData.startDate.split(' ').slice(0, 3).join(' ')
                    return <Text style={styles.dayText} key={`${eventHostName}${item}`}>{stringDate}</Text>
                  } else if (index === 0 || index === 1) {
                    return <Text style={styles.dayText} key={`${eventHostName}${item}`}>{item}</Text>
                  } else {
                    return <Text style={styles.dayText} key={`${eventHostName}${item}`}>/{item}</Text>
                  }
                })
              }
            </View>
          </View>
          <View style={styles.time}><Text style={styles.timeText}>{startTime} - {finishTime}</Text></View>

        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewEventScreen)
