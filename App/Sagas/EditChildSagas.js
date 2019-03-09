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
import EditChildActions from '../Redux/EditChildRedux'
import { dbService, mapp } from '../Services/Firebase'
import { NavigationActions } from 'react-navigation'
import { Platform } from 'react-native'
import { genericFileUpload } from '../Services/Uploader'
import LoginActions from '../Redux/LoginRedux'

export function * editChild ({cdata, alertfunc, nav}) {
  const { gid,
    fName,
    lName,
    age,
    profileImage,
    gender,
    allergies,
    ckey } = cdata

  let storageRef = mapp.storage().ref(`childImages/${gid}`)

  try {
    let childImageLoc
    if (profileImage.uri) {
      const uploadUri = Platform.OS === 'ios' ? profileImage.uri.replace('file://', '') : profileImage.uri
      childImageLoc = yield call(genericFileUpload, uploadUri, profileImage.name, storageRef)
    } else { childImageLoc = profileImage }

    const childKey = yield call(dbService.database.patch, `guardians/${gid}/children/${ckey}`, {
      gid,
      fName,
      lName,
      age,
      profileImage: childImageLoc,
      gender,
      allergies
    })

    const guardian = yield call(dbService.database.read, `guardians/${gid}`)
    yield put(LoginActions.loginSuccess({gid, ...guardian}))
    yield put(EditChildActions.editChildSuccess({childKey}))
    const resetAction = nav.reset([NavigationActions.navigate({routeName: 'DashboardScreen'})], 0)
    yield call(nav.dispatch, resetAction)
  } catch (error) {
    yield put(EditChildActions.editChildFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
