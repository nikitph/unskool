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

    // const res = yield call(service.create, {email,password})
    //console.log("this is the res", res)
    /* client.service('users').create({email, password})
       .then((result)=>{

         client.authenticate({
           strategy: 'local',
           email: email,
           password: password
         }).then(() => {
           console.log("cool i m logged in ")
           nav.dispatch(nav.reset([NavigationActions.navigate({routeName: 'ScreenOne'}, {uid :'123'})], 0))
         }).catch(e => {
           // Show login page (potentially with `e.message`)
           console.error('Authentication error', e);
         });

       })*/
    /* const response = yield call(client.service('users').create, {email, password})
     const {uid, displayName, photoURL} = response.user
     if (uid) {
       yield put(SignUpActions.signUpSuccess({uid, displayName, photoURL}))
       const resetAction = nav.reset([NavigationActions.navigate({routeName: 'ScreenOne'}, {uid})], 0)
       yield put(ChatActions.chatRequest({uid: uid}))
       yield call(nav.dispatch, resetAction)
     } else { yield put(SignUpActions.signUpFailure('unknown Error')) }*/
  } catch (error) {
    yield put(SignUpActions.signUpFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
