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
import DeleteEventActions from '../Redux/DeleteEventRedux'
import { dbService, mapp } from '../Services/Firebase'
import { NavigationActions } from 'react-navigation'
// import { DeleteEventSelectors } from '../Redux/DeleteEventRedux'

export function * deleteEvent ({edata, alertfunc, nav}) {
  const { ekey, gid } = edata

  try {
    yield call(dbService.database.delete, `hostEvents/${gid}/${ekey}`)
    yield put(DeleteEventActions.deleteEventSuccess({del: 'done'}))
    const resetAction = nav.reset([NavigationActions.navigate({routeName: 'DashboardScreen'})], 0)
    yield call(nav.dispatch, resetAction)
  } catch (error) {
    yield put(DeleteEventActions.deleteEventFailure({error}))
    alertfunc('error', 'Error', error.message)
  }
}
