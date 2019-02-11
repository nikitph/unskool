import { call, put } from 'redux-saga/effects'
import SignUpActions from '../Redux/SignUpRedux'
import { dbService } from '../Services/Firebase'

export function * signUp ({ email, password, alertfunc, nav}) {
  try {
    const response = yield call(dbService.auth.createUserWithEmailAndPassword, email.toString(), password.toString(), function () {})
    const { uid, displayName, photoURL } = response
    yield put(SignUpActions.signUpSuccess({ uid, displayName, photoURL }))
    nav.navigate('SignUpDetailsScreen', {uid: uid})
  } catch (error) {
    yield put(SignUpActions.signUpFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
