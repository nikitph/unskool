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
import SingleGuardianActions from '../Redux/SingleGuardianRedux'
import { dbService } from '../Services/Firebase'
import { NavigationActions } from 'react-navigation'
import FastImage from 'react-native-fast-image'// import { SingleGuardianSelectors } from '../Redux/SingleGuardianRedux'

export function * getSingleGuardian ({ gid, nav }) {
  try {
    const guardian = yield call(dbService.database.read, `guardians/${gid}`)

    if (guardian.image) {
      FastImage.preload([
        {
          uri: guardian.image
        }])
    }
    yield put(SingleGuardianActions.singleGuardianSuccess({guardian}))
    const gAction = NavigationActions.navigate({routeName: 'ViewGuardianScreen', params: guardian})
    yield call(nav.dispatch, gAction)
  } catch (error) {
    yield put(SingleGuardianActions.singleGuardianFailure({error}))
  }
}
