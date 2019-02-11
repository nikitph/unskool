import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { dbService } from '../Services/Firebase'
import { NavigationActions } from 'react-navigation'

// attempts to login
export function * login ({email, password, alertfunc, nav}) {
  try {
    const response = yield call(dbService.auth.signInWithEmailAndPassword, email.toString(), password.toString(), function () {})
    const {uid, displayName, photoURL} = response
    // const location = yield call(dbService.database.read, `users/${uid}/location`)
    yield put(LoginActions.loginSuccess({uid, displayName, photoURL}))
    const resetAction = nav.reset([NavigationActions.navigate({ routeName: 'DashboardScreen' })], 0)
    yield call(nav.dispatch, resetAction)
  } catch (error) {
    yield put(LoginActions.loginFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
