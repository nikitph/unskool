import { createStackNavigator, createAppContainer } from 'react-navigation'
import CreateEventScreen from '../Containers/CreateEventScreen'
import CreateChildScreen from '../Containers/CreateChildScreen'
import FeedbackScreen from '../Containers/FeedbackScreen'
import TutorialScreen from '../Containers/TutorialScreen'
import CreateGuardianScreen from '../Containers/CreateGuardianScreen'
import DashboardScreen from '../Containers/DashboardScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  CreateEventScreen: { screen: CreateEventScreen },
  CreateChildScreen: { screen: CreateChildScreen },
  TutorialScreen: { screen: TutorialScreen },
  CreateGuardianScreen: { screen: CreateGuardianScreen },
  DashboardScreen: { screen: DashboardScreen },
  FeedbackScreen: { screen: FeedbackScreen },
  SignUpScreen: { screen: SignUpScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
