import React, { Component } from 'react'
import { SafeAreaView, Text, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CustomSideBarScreenStyle'

class CustomSideBarScreen extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <TouchableOpacity style={styles.menuStyle} onPress={() => {

            Alert.alert(
              'Confirm',
              'Are you sure you want to logout from app?',
              [
                {
                  text: 'Yes',
                  onPress: () => {
                    AsyncStorage.removeItem('user', () => {
                      const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
                      });
                      this.props.navigation.dispatch(resetAction);
                    })
                  }
                },
                {
                  text: 'No',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel'
                },
              ],
              { cancelable: false }
            )

          }}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSideBarScreen)
