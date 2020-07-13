import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  formContainer: {
    // flex: 1,
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
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    minHeight: 40,
    borderRadius: 3,
    fontSize: 18,
    padding: 10,
    marginTop: 4,
    marginBottom: 4,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginLeft: 0,
    marginRight: 0
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  row: {
    padding: 10,
    height: 36,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  description: {
    fontSize: 12
  },
  addSpecialtiesCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  }
})
