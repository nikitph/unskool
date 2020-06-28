import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import ElementStyles from '../Themes/ElementStyles'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { ThemeProvider } from 'react-native-elements'
import codePush from "react-native-code-push";
import OneSignal from 'react-native-onesignal'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

  constructor (properties) {
    super(properties)
    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0)

    this.myiOSPromptCallback = this.myiOSPromptCallback.bind(this)

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('ded3a8ce-6ea3-4a2e-bec4-8703129d21a1', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2
    })
    OneSignal.inFocusDisplaying(2) // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(this.myiOSPromptCallback)

    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('ids', this.onIds)
  }

  componentWillUnmount () {
    OneSignal.removeEventListener('received', this.onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('ids', this.onIds)
  }

  onReceived (notification) {
    console.log('Notification received: ', notification)
  }

  onOpened (openResult) {
    console.log('Message: ', openResult.notification.payload.body)
    console.log('Data: ', openResult.notification.payload.additionalData)
    console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult)
  }

  onIds (device) {
    console.log('Device info: ', device)
    console.log('App.js > device.ID: ' + device.userId)
  }

  myiOSPromptCallback (permission) {
    // do something with permission value
  }
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={ElementStyles}>
          <RootContainer />
        </ThemeProvider>
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
App = codePush(App);

export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
