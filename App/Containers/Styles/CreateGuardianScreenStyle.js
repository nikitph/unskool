import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

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
  }

})
