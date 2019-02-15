import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'
import DropdownAlert from 'react-native-dropdownalert'
import * as Animatable from 'react-native-animatable'
import { Button } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import LoginActions from '../Redux/LoginRedux'
// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  props: LoginScreenProps;

  constructor (props: LoginScreenProps) {
    super(props)
    this.showAlert = this.showAlert.bind(this)

    this.state = {
      email: 'n@n.com',
      password: '123456',
      invalidEmail: false,
      invalidPassword: false,
      incorrectPassword: false,
      noMatch: false,
      buttonstate: props.fetching
    }
  }

  handlePressLogin = () => {
    const {email, password} = this.state
    this.props.attemptLogin(email, password, this.showAlert, this.props.navigation)
  }

  showAlert (type, title, message) {
    this.dropdown.alertWithType(type, title, message)
  };

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Animatable.Image animation='rotate' duration='9000' iterationCount='infinite' source={Images.launch} style={styles.logo} />
        </View>
        <View
          style={{flex: 0.4, backgroundColor: 'white', margin: 20, borderRadius: 10, flexDirection: 'row' }}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <View style={{flex: 0.1}}>
              <Text style={styles.header}> Login </Text>
            </View>
            <View style={{flex: 0.7, flexDirection: 'row'}}>
              <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='ios-arrow-back' size={50} color='#900'
                  onPress={() => this.props.navigation.navigate('LaunchScreen')}
                  />
              </View>
              <View style={{flex: 0.9}}>
                <View style={styles.container}>
                  <View style={styles.form}>
                    <View style={styles.row}>
                      <View style={{flex: 0.1}}>
                        <Icon name='ios-mail' size={24} color='rgba(0,0,0,0.5)'
                          />
                      </View>
                      <View style={{flex: 0.9}}>
                        <TextInput
                          value={this.state.email}
                          keyboardType='default'
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          style={{fontFamily: 'AvenirNext-UltraLight', textAlign: 'left', color: 'rgba(0,0,0,0.8)', fontSize: 18, fontWeight: '200'}}
                          underlineColorAndroid='transparent'
                          placeholder={'Email Address'}
                          onChangeText={(email) => this.setState({email})}
                          onSubmitEditing={() => this.refs.password.focus()}
                          />
                      </View>

                    </View>

                    <View style={styles.row}>
                      <View style={{flex: 0.1}}>
                        <Icon name='ios-key' size={24} color='rgba(0,0,0,0.5)'
                          />
                      </View>
                      <View style={{flex: 0.9}}>
                        <TextInput
                          ref='password'
                          value={this.state.password}
                          keyboardType='default'
                          returnKeyType='go'
                          autoCapitalize='none'
                          style={{fontFamily: 'AvenirNext-UltraLight', textAlign: 'left', color: 'rgba(0,0,0,0.8)', fontSize: 18, fontWeight: '200'}}
                          autoCorrect={false}
                          secureTextEntry
                          underlineColorAndroid='transparent'
                          placeholder={'Password'}
                          onChangeText={(password) => this.setState({password})}
                          />
                      </View>
                    </View>
                    <View>
                      <Text style={[styles.forgot]} onPress={() => this.props.navigation.navigate('ResetPasswordScreen')}
                        > Forgot Password </Text>
                    </View>

                  </View>

                </View>

              </View>
            </View>
            <View style={{flex: 0.2}}>
              <Button
                onPress={() => { this.handlePressLogin() }}
                type='solid'
                title='Submit'
                loading={this.props.fetching}
                 /></View>
          </View>
        </View>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          showCancel
          translucent
          errorColor={'rgba(250,50,50,1)'}
          closeInterval={6000}
        />
      </View>
    )
  }
}

type LoginScreenProps = {
  dispatch: PropTypes.func,
  fetching: PropTypes.boolean,
  attemptLogin: PropTypes.func,
  error: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (email, password, alertfunc, nav) => dispatch(LoginActions.loginRequest(email, password, alertfunc, nav))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
