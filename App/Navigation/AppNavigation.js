import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import ResetPasswordScreen from '../Containers/ResetPasswordScreen'
import ConversationsScreen from '../Containers/ConversationsScreen'
import ChatScreen from '../Containers/ChatScreen'
import ViewEventScreen from '../Containers/ViewEventScreen'
import ViewGuardianScreen from '../Containers/ViewGuardianScreen'
import ChildViewScreen from '../Containers/ChildViewScreen'
import EditEventScreen from '../Containers/EditEventScreen'
import EditChildScreen from '../Containers/EditChildScreen'
import EditGuardianScreen from '../Containers/EditGuardianScreen'
import BrowseHostsScreen from '../Containers/BrowseHostsScreen'
import FeedbackFormScreen from '../Containers/FeedbackFormScreen'
import CreateEventScreen from '../Containers/CreateEventScreen'
import CreateChildScreen from '../Containers/CreateChildScreen'
import FeedbackScreen from '../Containers/FeedbackScreen'
import TutorialScreen from '../Containers/TutorialScreen'
import CreateGuardianScreen from '../Containers/CreateGuardianScreen'
import DashboardScreen from '../Containers/DashboardScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import Reviews from '../Containers/Reviews';
import FriendReview from '../Containers/FriendReview';
import SplashScreen from '../Containers/SplashScreen';
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  SplashScreen: { screen: SplashScreen },
  ResetPasswordScreen: { screen: ResetPasswordScreen },
  ConversationsScreen: { screen: ConversationsScreen },
  ChatScreen: { screen: ChatScreen },
  ViewEventScreen: { screen: ViewEventScreen },
  ViewGuardianScreen: { screen: ViewGuardianScreen },
  ChildViewScreen: { screen: ChildViewScreen },
  EditEventScreen: { screen: EditEventScreen },
  EditChildScreen: { screen: EditChildScreen },
  EditGuardianScreen: { screen: EditGuardianScreen },
  BrowseHostsScreen: { screen: BrowseHostsScreen },
  FeedbackFormScreen: { screen: FeedbackFormScreen },
  CreateEventScreen: { screen: CreateEventScreen },
  CreateChildScreen: { screen: CreateChildScreen },
  TutorialScreen: { screen: TutorialScreen },
  CreateGuardianScreen: { screen: CreateGuardianScreen },
  DashboardScreen: { screen: DashboardScreen },
  FeedbackScreen: { screen: FeedbackScreen },
  SignUpScreen: { screen: SignUpScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen },
  Reviews: { screen: Reviews, navigationOptions: { headerShown: false } },
  FriendReview: { screen: FriendReview, navigationOptions: { headerShown: false } },
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'SplashScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
