import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {connect} from 'react-redux';
import {Images} from '../Themes';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';
import {Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SignUpActions from '../Redux/SignUpRedux';
// Styles
import styles from './Styles/SignUpScreenStyle';

class SignUpScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  props: SignUpScreenProps;

  constructor(props: SignUpScreenProps) {
    super(props);
    this.showAlert = this.showAlert.bind(this);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      passwordMismatch: false,
      invalidEmail: false,
      invalidPassword: false,
      incorrectPassword: false,
      noMatch: false,
      buttonstate: props.fetching ? 'fetching' : 'ready',
    };
  }

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    await GoogleSignin.configure({
      iosClientId:
        '161095567640-nr41700p1s4cbr6jken5t4bgft9gqhj4.apps.googleusercontent.com',
      offlineAccess: false,
    });
    let emailPassword = await AsyncStorage.getItem('emailPassword');
    const {email, password} = JSON.parse(emailPassword);
    this.setState({email, password});
  };

  handlePressGoogleLogin = async () => {
    // const authProvider = new firebase.auth.GoogleAuthProvider()

    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const provider = firebase.auth.GoogleAuthProvider;
    const credential = provider.credential(userInfo.idToken);
    this.props.attemptSocialLogin(
      credential,
      this.showAlert,
      this.props.navigation,
    );
  };

  facebookLogin = () => {
    return LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          alert('Login was cancelled');
          return null;
        } else {
          return AccessToken.getCurrentAccessToken().then(data => {
            const provider = firebase.auth.FacebookAuthProvider;
            const credential = provider.credential(data.accessToken);
            return credential;
          });
        }
      },
      error => {
        alert('Login failed with error: ' + error);
        return null;
      },
    );
  };

  handlePressFacebookLogin = async () => {
    // if(Platform.OS=='android'){
    //   LoginManager.setLoginBehavior('WEB_ONLY');
    // }
    let credential = await this.facebookLogin();
    this.props.attemptSocialLogin(
      credential,
      this.showAlert,
      this.props.navigation,
    );
  };

  handlePressSignUp = state => {
    const {email, password, confirmPassword} = state;
    if (password === confirmPassword) {
      this.setState({passwordMismatch: false});
      this.props.attemptSignUp(
        email,
        password,
        this.showAlert,
        this.props.navigation,
      );
    } else {
      this.setState({passwordMismatch: true});
    }
  };

  showAlert(type, title, message) {
    this.dropdown.alertWithType(type, title, message);
  }

  render() {
    const props = this.props;

    return (
      <KeyboardAwareScrollView
        extraScrollHeight={10}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Animatable.Image
            animation="rotate"
            duration={9000}
            iterationCount="infinite"
            source={Images.launch}
            style={styles.logo}
          />
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'white',
            margin: 20,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <View style={{flex: 0.1}}>
              <Text style={styles.header}> Sign Up </Text>
            </View>
            <View style={{flex: 0.7, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 0.1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="ios-arrow-back"
                  size={50}
                  color="#900"
                  onPress={() => props.navigation.navigate('LaunchScreen')}
                />
              </View>
              <View style={{flex: 0.9}}>
                <View style={styles.container}>
                  <View style={styles.form}>
                    <View style={styles.row}>
                      <View style={{flex: 0.1}}>
                        <Icon
                          name="ios-mail"
                          size={24}
                          color="rgba(0,0,0,0.5)"
                        />
                      </View>
                      <View style={{flex: 0.9}}>
                        <TextInput
                          value={this.state.email}
                          keyboardType="default"
                          returnKeyType="next"
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{
                            fontFamily: 'AvenirNext-UltraLight',
                            textAlign: 'left',
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 18,
                            fontWeight: '400',
                          }}
                          underlineColorAndroid="transparent"
                          placeholder={'Email Address'}
                          onChangeText={email => this.setState({email})}
                          onSubmitEditing={() => this.refs.password.focus()}
                        />
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={{flex: 0.1}}>
                        <Icon
                          name="ios-key"
                          size={24}
                          color="rgba(0,0,0,0.5)"
                        />
                      </View>
                      <View style={{flex: 0.9}}>
                        <TextInput
                          ref="password"
                          value={this.state.password}
                          keyboardType="default"
                          returnKeyType="go"
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{
                            fontFamily: 'AvenirNext-UltraLight',
                            textAlign: 'left',
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 18,
                            fontWeight: '400',
                          }}
                          secureTextEntry
                          underlineColorAndroid="transparent"
                          placeholder={'Password'}
                          onChangeText={password => this.setState({password})}
                        />
                      </View>
                    </View>

                    <View style={styles.row}>
                      <View style={{flex: 0.1}}>
                        <Icon
                          name="ios-key"
                          size={24}
                          color="rgba(0,0,0,0.5)"
                        />
                      </View>
                      <View style={{flex: 0.9}}>
                        <TextInput
                          ref="password"
                          value={this.state.confirmPassword}
                          keyboardType="default"
                          returnKeyType="go"
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{
                            fontFamily: 'AvenirNext-UltraLight',
                            textAlign: 'left',
                            color: 'rgba(0,0,0,0.8)',
                            fontSize: 18,
                            fontWeight: '400',
                          }}
                          secureTextEntry
                          underlineColorAndroid="transparent"
                          placeholder={'Confirm Password'}
                          onChangeText={confirmPassword =>
                            this.setState({confirmPassword})
                          }
                        />
                      </View>
                    </View>
                  </View>

                  {this.state.passwordMismatch &&
                    this.showAlert(
                      'error',
                      'Error',
                      'The passwords do not match',
                    )}
                </View>
              </View>
            </View>
            <View style={{flex: 0.2}}>
              <Button
                onPress={() => {
                  this.handlePressSignUp(this.state);
                }}
                type="solid"
                title="Submit"
                loading={this.props.fetching}
              />
            </View>
            <View>
              <GoogleSigninButton
                style={styles.socialLoginbutton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => {
                  this.handlePressGoogleLogin();
                }}
              />
              <TouchableOpacity
                style={[styles.socialLoginbutton, {backgroundColor: '#3B5998'}]}
                onPress={() => {
                  this.handlePressFacebookLogin();
                }}>
                <Icon name="logo-facebook" size={30} color="white" />
                <Text style={styles.facebookText}>Sign in with Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          showCancel
          translucent
          errorColor={'rgba(250,50,50,1)'}
          closeInterval={6000}
        />
      </KeyboardAwareScrollView>
    );
  }
}

type SignUpScreenProps = {
  dispatch: PropTypes.func,
  fetching: PropTypes.object,
  attemptSignUp: PropTypes.func,
  error: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    fetching: state.signup.fetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    attemptSignUp: (email, password, alertfunc, nav) =>
      dispatch(SignUpActions.signUpRequest(email, password, alertfunc, nav)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScreen);
