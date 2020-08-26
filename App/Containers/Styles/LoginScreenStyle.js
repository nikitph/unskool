import {StyleSheet, Dimensions} from 'react-native';
import {Metrics, Colors, ApplicationStyles} from '../../Themes';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.5,
  },
  cart: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.35,
    marginTop: -140,
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'AvenirNext-UltraLight',
    fontSize: 20,
  },
  forgot: {
    color: '#665234',
    alignSelf: 'flex-end',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
  },
  signIn: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
  },
  signInLink: {
    marginLeft: 1,
    color: 'white',
  },
  form: {
    backgroundColor: Colors.clear,
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: Metrics.smallMargin,
    margin: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingLeft: 15,
  },
  rowLabel: {
    color: Colors.charcoal,
  },
  textInput: {
    height: 40,
    color: Colors.coal,
    fontFamily: 'Avenir',
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel,
  },
  loginRow: {
    marginTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    flexDirection: 'row',
  },
  loginButtonWrapper: {
    flex: 1,
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.bloodOrange,
    backgroundColor: Colors.transparent,
    padding: 6,
  },
  loginText: {
    textAlign: 'center',
    color: Colors.ember,
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
    opacity: 0.7,
  },

  socialLoginbutton: {
    width: width - 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.2,
    marginTop: 5,
  },
  facebookText: {
    textAlign: 'center',
    width: width - 100,
    fontWeight: '700',
    color: 'white',
  },
});
