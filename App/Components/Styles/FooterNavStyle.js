import styleVariables from '../../Themes/Variables'
import Metrics from '../../Themes/Metrics'
const deviceWidth = Metrics.screenWidth

const FooterNav = {}

FooterNav.container = {
  position: 'absolute',
  bottom: 0,
  shadowColor: 'rgba(51, 51, 112, 0.2)',
  shadowOffset: { width: 0, height: -1 },
  shadowOpacity: 1,
  zIndex: 1
}

FooterNav.footerNav = {
  display: 'flex',
  flexDirection: 'row'
}

FooterNav.footerLink = {
  position: 'relative',
  display: 'flex',
  width: '19.5%',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2
}

FooterNav.footerLinkCopy = {
  fontSize: 10,
  padding: 5,
  paddingRight: 2,
  paddingLeft: 2,
  textAlign: 'center',
  alignItems: 'center',
  color: 'gray'
}

FooterNav.browseHostsButton = {
  // position: 'relative',
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  zIndex: 2
}

FooterNav.browseHostsLink = {
  width: '22%',
  borderRadius: 3,
  borderColor: styleVariables.mc2lightGray,
  position: 'relative',
  top: -4,
  borderTopColor: '#fdfdfd',
  borderTopWidth: 10,
  zIndex: 2
}

FooterNav.decoCurve = {
  position: 'absolute',
  height: 65,
  top: -20,
  shadowColor: 'rgba(51, 51, 112, 0.2)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1,
  width: '23.15%',
  left: (deviceWidth / 2) - ((deviceWidth * 0.2315) / 2),
  borderRadius: 30,
  zIndex: -1
}

FooterNav.notificationsBubble = {
  position: 'absolute',
  right: 25,
  top: -2,
  width: 18,
  height: 18,
  paddingLeft: 0,
  paddingRight: 0,
  borderRadius: 9
}

export default FooterNav
