import { call, put } from 'redux-saga/effects'
import SignUpActions from '../Redux/SignUpRedux'
import { dbService } from '../Services/Firebase'
import { NavigationActions } from 'react-navigation'

export function * signUp ({email, password, alertfunc, nav}) {
  try {
    const response = yield call(dbService.auth.createUserWithEmailAndPassword, email.toString(), password.toString(), function () {})
    const {uid, displayName, photoURL} = response.user
    if (uid) {
      yield put(SignUpActions.signUpSuccess({uid, displayName, photoURL}))
      const resetAction = nav.reset([NavigationActions.navigate({routeName: 'ScreenOne'}, {uid})], 0)
      yield call(nav.dispatch, resetAction)
    } else { yield put(SignUpActions.signUpFailure('unknown Error')) }
  } catch (error) {
    yield put(SignUpActions.signUpFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
