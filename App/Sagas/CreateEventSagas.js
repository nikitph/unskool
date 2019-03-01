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
import CreateEventActions from '../Redux/CreateEventRedux'
import { Platform } from 'react-native'
import { dbService, mapp } from '../Services/Firebase'
import { genericFileUpload } from '../Services/Uploader'
import { NavigationActions } from 'react-navigation'
// import { CreateEventSelectors } from '../Redux/CreateEventRedux'

export function * createEvent ({edata, alertfunc, nav}) {
  const { gid,
    profileImage
    } = edata

  let storageRef = mapp.storage().ref(`eventImages/${gid}`)

  try {
    let eventImageLoc = 'https://www.cmsabirmingham.org/stuff/2017/01/default-placeholder.png'
    if (profileImage) {
      const uploadUri = Platform.OS === 'ios' ? profileImage.uri.replace('file://', '') : profileImage.uri
      eventImageLoc = yield call(genericFileUpload, uploadUri, profileImage.name, storageRef)
    }

    const eventKey = yield call(dbService.database.create, `hostEvents/${gid}`, {
      ...edata, profileImage: eventImageLoc
    })

    yield put(CreateEventActions.createEventSuccess({eventKey}))
    const resetAction = nav.reset([NavigationActions.navigate({routeName: 'DashboardScreen'})], 0)
    yield call(nav.dispatch, resetAction)
  } catch (error) {
    yield put(CreateEventActions.createEventFailure({error}))
    alertfunc('error', 'Error', error.message)
  }
}
