/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import EditEventActions from '../Redux/EditEventRedux'
import { dbService, mapp } from '../Services/Firebase'
import { genericFileUpload } from '../Services/Uploader'
import { NavigationActions } from 'react-navigation'
import { Platform } from 'react-native'
import LoginActions from '../Redux/LoginRedux'
// import { EditEventSelectors } from '../Redux/EditEventRedux'

export function * editEvent ({edata, alertfunc, nav}) {
  const {
    gid,
    profileImage,
    ekey
  } = edata

  let storageRef = mapp.storage().ref(`eventImages/${gid}`)

  try {
    let eventImageLoc
    if (profileImage.uri) {
      const uploadUri = Platform.OS === 'ios' ? profileImage.uri.replace('file://', '') : profileImage.uri
      eventImageLoc = yield call(genericFileUpload, uploadUri, profileImage.name, storageRef)
    } else { eventImageLoc = profileImage }

    const eventKey = yield call(dbService.database.patch, `hostEvents/${gid}/${ekey}`, {
      ...edata, profileImage: eventImageLoc
    })

    const guardian = yield call(dbService.database.read, `guardians/${gid}`)
    yield put(LoginActions.loginSuccess({gid, ...guardian}))
    yield put(EditEventActions.editEventSuccess({eventKey}))
    const resetAction = nav.reset([NavigationActions.navigate({routeName: 'DashboardScreen'})], 0)
    yield call(nav.dispatch, resetAction)
  } catch (error) {
    yield put(EditEventActions.editEventFailure({error}))
    alertfunc('error', 'Error', error.message)
  }
}
