import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Metrics from '../../Themes/Metrics'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 0.5,
    paddingTop: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  }
})
