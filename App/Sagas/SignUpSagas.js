import { call, put } from 'redux-saga/effects'
import SignUpActions from '../Redux/SignUpRedux'
import { dbService } from '../Services/Firebase'
import { client } from '../Services/Feathers'
import { NavigationActions } from 'react-navigation'
import ChatActions from '../Redux/ChatRedux'

export function * signUp ({email, password, alertfunc, nav}) {
  try {
    const service = yield client.service('users').create({email, password})
    console.log('this is the res', service)
    const res = yield call(client.authenticate, {strategy: 'local', email: email, password: password})
    console.log('this is the res', res)
    if (res.accessToken) {
      const {_id, email} = res.user
      yield put(SignUpActions.signUpSuccess({uid: _id, email, accessToken: res.accessToken}))
      const resetAction = nav.reset([NavigationActions.navigate({routeName: 'ScreenOne'}, {uid: _id})], 0)
      yield put(ChatActions.chatRequest({uid: _id}))
       yield call(nav.dispatch, resetAction)
    } else { yield put(SignUpActions.signUpFailure('unknown Error')) }
  } catch (error) {
    yield put(SignUpActions.signUpFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
