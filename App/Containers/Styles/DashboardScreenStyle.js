import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
})
