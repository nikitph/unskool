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
import GuardianActions from '../Redux/GuardianRedux'
import { dbService } from '../Services/Firebase'
// import { GuardianSelectors } from '../Redux/GuardianRedux'

export function * getGuardians () {
  const channel = yield call(dbService.database.channel, `guardians`)

  while (true) {
    const { value: guardians } = yield take(channel)
    console.log(guardians)
    yield put(GuardianActions.guardianSuccess(guardians))
  }
}
