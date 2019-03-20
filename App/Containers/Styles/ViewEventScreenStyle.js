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
  color: 'white',
  fontSize: 16,
  fontWeight: '500'
}

ViewEvent.tags = {
  display: 'flex',
  flexDirection: 'row'
}

ViewEvent.bulletAndTagItem = {
  display: 'flex',
  marginRight: 18,
  flexDirection: 'row',
  alignItems: 'center'
}

ViewEvent.bullet = {
  width: 5,
  height: 5,
  borderRadius: 2.5,
  marginRight: 3,
  backgroundColor: 'white'
}

ViewEvent.tagItem = {
  color: 'white',
  fontSize: 12
}

ViewEvent.dayAndTime = {
  display: 'flex',
  flexDirection: 'row'
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
  alignItems: 'flex-end',
  justifyContent: 'flex-end'
}

ViewEvent.timeText = {
  color: 'white',
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
  color: 'white',
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

export default ViewEvent
