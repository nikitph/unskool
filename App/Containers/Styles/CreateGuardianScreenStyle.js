import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  formContainer: {
    flex: 1,
    marginHorizontal: 10
  },

  checkboxContainer: {
    marginTop: 10
  },

  submit: {
    marginTop: 30,
    marginBottom: 20
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
    opacity: 0.6
  }

})
