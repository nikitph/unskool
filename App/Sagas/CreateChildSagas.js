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
import CreateChildActions from '../Redux/CreateChildRedux'
import { dbService, mapp } from '../Services/Firebase'
import { NavigationActions } from 'react-navigation'
import { Platform } from 'react-native'
import { genericFileUpload } from '../Services/Uploader'

export function * createChild ({cdata, alertfunc, nav}) {
  const { gid,
    fName,
    lName,
    age,
    profileImage,
    gender,
    allergies } = cdata

  let storageRef = mapp.storage().ref(`childImages/${gid}`)

  try {
    let childImageLoc = 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'
    if (profileImage.uri) {
      const uploadUri = Platform.OS === 'ios' ? profileImage.uri.replace('file://', '') : profileImage.uri
      childImageLoc = yield call(genericFileUpload, uploadUri, profileImage.name, storageRef)
    }

    const childKey = yield call(dbService.database.create, `guardians/${gid}/children`, {
      gid,
      fName,
      lName,
      age,
      profileImage: childImageLoc,
      gender,
      allergies
    })

    yield put(CreateChildActions.createChildSuccess({childKey}))
    const resetAction = nav.reset([NavigationActions.navigate({routeName: 'DashboardScreen'})], 0)
    yield call(nav.dispatch, resetAction)
  } catch (error) {
    yield put(CreateChildActions.createChildFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
