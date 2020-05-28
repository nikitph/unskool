import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

import styleVariables from '../../Themes/Variables'
import Metrics from '../../Themes/Metrics'
const deviceWidth = Metrics.screenWidth

const ViewEvent = {}

ViewEvent.container = {
  marginBottom: 65
}

ViewEvent.teaserContainer = {
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: styleVariables.mc2purpleElectric,
  width: deviceWidth,
  height: 200
}

ViewEvent.eventView = {
  position: 'absolute',
  width: '100%',
  paddingLeft: 4,
  paddingBottom: 2,
  backgroundColor: 'transparent',
  bottom: 0
}

ViewEvent.title = {
  color: 'black',
  position: 'relative',
  fontSize: 20,
  fontWeight: '300',
  alignSelf: 'center',
  margin: 10,
  textDecorationLine: 'underline'
}

ViewEvent.ageRange = {
  color: 'black',
  position: 'relative',
  fontSize: 16,
  fontWeight: '300',
  alignSelf: 'center'
}

ViewEvent.tags = {
  display: 'flex',
  flexDirection: 'row',
  alignSelf: 'center'
}

ViewEvent.bulletAndTagItem = {
  display: 'flex',
  marginVertical: 15,
  flexDirection: 'row',
  alignItems: 'center'
}

ViewEvent.bullet = {

  margin: 4,
  backgroundColor: 'white'
}

ViewEvent.tagItem = {
  color: 'white',
  fontSize: 16,
  padding: 3,
}

ViewEvent.badgeContainer = {height: 24}

ViewEvent.dayAndTime = {
  display: 'flex',
  flexDirection: 'row',
  alignSelf: 'center'
}

ViewEvent.days = {
  display: 'flex',
  flexDirection: 'row',
  marginRight: 3
}

ViewEvent.dayText = {
  color: styleVariables.mc2LightBlue,
  fontWeight: '500',
  lineHeight: 16,
  fontSize: 16
}

ViewEvent.time = {
  alignItems: 'center',
  justifyContent: 'center'
}

ViewEvent.timeText = {
  color: 'black',
  fontSize: 12
}

ViewEvent.hostName = {
  position: 'absolute',
  top: 5,
  left: 5,
  backgroundColor: styleVariables.mc2BlueElectric,
  padding: 5,
  borderRadius: 3,
  zIndex: 2
}

ViewEvent.hostNameText = {
  color: 'black',
  fontWeight: '500'
}

ViewEvent.teaserImage = {
  width: deviceWidth - 40,
  height: 200
}

ViewEvent.requestFriendButton = {
  position: 'absolute',
  right: 9,
  bottom: 0,
  zIndex: 1
}

ViewEvent.childDropOff = {
  position: 'absolute',
  borderRadius: 25,
  right: 9,
  bottom: 17,
  zIndex: 1
}

ViewEvent.eventView = {
  paddingTop: 13
}

ViewEvent.eventTitle = {
  fontSize: 16,
  color: styleVariables.mc2fontGray
}

ViewEvent.eventTags = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5
}

ViewEvent.tagItemCopy = {
  color: styleVariables.mc2medGray,
  marginRight: 20
}

ViewEvent.eventDays = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginTop: 5
}

ViewEvent.eventDay = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  color: styleVariables.mc2Turquoise,
  fontSize: 17,
  fontWeight: '500'
}

export default ViewEvent
