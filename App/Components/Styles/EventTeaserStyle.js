import styleVariables from '../../Themes/Variables'
import Metrics from '../../Themes/Metrics'
import { scale } from '../../Themes/ScalingUtils';
import { Images, Colors, Fonts } from '../../Themes';

const EventTeaser = {}

EventTeaser.teaserContainer = {
  padding: 20,
  paddingLeft: 18,
  paddingRight: 0,
  backgroundColor: 'white'
}

EventTeaser.teaserImage = {
  width: Metrics.screenWidth - 100,
  height: 100,
  backgroundColor: styleVariables.mc2purpleElectric
}

EventTeaser.addEventContainer = {
  zIndex: 2
}

EventTeaser.editItem = {
  position: 'absolute',
  right: 6,
  bottom: -15,
  zIndex: 2
}

EventTeaser.addItem = {
  position: 'absolute',
  right: 56,
  bottom: -15,
  zIndex: 2
}

EventTeaser.addCopy = {
  color: 'white',
  fontSize: 7
}

EventTeaser.eventView = {
  paddingTop: 13
}

EventTeaser.eventTitle = {
  fontSize: 16,
  color: styleVariables.mc2fontGray
}

EventTeaser.eventTags = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5
}

EventTeaser.tagItemCopy = {
  color: styleVariables.mc2medGray,
  marginRight: 20
}

EventTeaser.eventDays = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  marginTop: 5
}

EventTeaser.userTitle = {
  marginLeft: scale(10),
  fontFamily: Fonts.type.base,
  fontSize: scale(20),
}
EventTeaser.br = {
  height: 1,
  marginVertical: scale(10),
  backgroundColor: 'rgba(0,0,0,0.6)',
}

EventTeaser.eventDay = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  color: styleVariables.mc2Turquoise,
  fontSize: 17,
  fontWeight: '500'
}

export default EventTeaser
