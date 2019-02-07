import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
    opacity: 0.5
  },
  family: {
    height: Metrics.images.family,
    width: Metrics.images.family,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  buttonTitle: {
    ...Fonts.style.normal,
    color: Colors.charcoal,
    fontSize: 12,
    textAlign: 'center'
  }
})
