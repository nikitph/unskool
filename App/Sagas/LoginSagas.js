import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import BrowseHostActions from '../Redux/BrowseHostsRedux'
import GuardianActions from '../Redux/GuardianRedux'
import { dbService } from '../Services/Firebase'
import { NavigationActions } from 'react-navigation'
import FastImage from 'react-native-fast-image'
import { AsyncStorage } from 'react-native'

// attempts to login
export function* login({ email, password, alertfunc, nav }) {
  try {
    const response = yield call(dbService.auth.signInWithEmailAndPassword, email.toString(), password.toString(), function () { })
    const { uid, displayName, photoURL } = response.user
    const guardian = yield call(dbService.database.read, `guardians/${uid}`)
    console.log("response", response);
    console.log("guardian", guardian);
    if (guardian.image) {
      FastImage.preload([
        {
          uri: guardian.image
        }])
    }
    // const location = yield call(dbService.database.read, `users/${uid}/location`)
    yield put(LoginActions.loginSuccess({ uid, displayName, photoURL, ...guardian }))
    AsyncStorage.setItem('user', JSON.stringify({ uid, displayName, photoURL, ...guardian }))

    // yield put(BrowseHostActions.browseHostsRequest())
    // yield put(GuardianActions.guardianRequest())
    const resetAction = nav.reset([NavigationActions.navigate({ routeName: 'DashboardScreen' }, { ...guardian })], 0)
    yield call(nav.dispatch, resetAction)
  } catch (error) {
    console.log(error)
    yield put(LoginActions.loginFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
