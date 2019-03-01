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

import { call, put, take } from 'redux-saga/effects'
import BrowseHostsActions from '../Redux/BrowseHostsRedux'
import { mapp, dbService } from '../Services/Firebase'
// import { BrowseHostsSelectors } from '../Redux/BrowseHostsRedux'

export function * browseHosts () {
  const channel = yield call(dbService.database.channel, `hostEvents`)

  while (true) {
    const { value: events } = yield take(channel)
    console.log(events)
    yield put(BrowseHostsActions.browseHostsSuccess(events))
  }
}
