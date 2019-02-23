import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  subTitle: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: '500',
    color: 'rgba(0,0,0,.5)'
  }
})
