import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    marginTop: 10
  },
  menuStyle: {
    backgroundColor: '#ccc',
    padding: 15
  }
})
