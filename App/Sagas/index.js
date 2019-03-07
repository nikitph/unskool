import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { SignUpTypes } from '../Redux/SignUpRedux'
import { CreateGuardianTypes } from '../Redux/CreateGuardianRedux'
import { CreateChildTypes } from '../Redux/CreateChildRedux'
import { EditChildTypes } from '../Redux/EditChildRedux'
import { CreateEventTypes} from '../Redux/CreateEventRedux'
import { BrowseHostsTypes } from '../Redux/BrowseHostsRedux'
import { GuardianTypes } from '../Redux/GuardianRedux'
import { EditGuardianTypes } from '../Redux/EditGuardianRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { login } from './LoginSagas'
import { signUp } from './SignUpSagas'
import { createGuardian } from './CreateGuardianSagas'
import { editGuardian } from './EditGuardianSagas'
import { createChild } from './CreateChildSagas'
import { editChild } from './EditChildSagas'
import { createEvent } from './CreateEventSagas'
import { browseHosts } from './BrowseHostsSagas'
import { getGuardians } from './GuardianSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(SignUpTypes.SIGN_UP_REQUEST, signUp),
    takeLatest(CreateGuardianTypes.CREATE_GUARDIAN_REQUEST, createGuardian),
    takeLatest(EditGuardianTypes.EDIT_GUARDIAN_REQUEST, editGuardian),
    takeLatest(CreateChildTypes.CREATE_CHILD_REQUEST, createChild),
    takeLatest(EditChildTypes.EDIT_CHILD_REQUEST, editChild),
    takeLatest(CreateEventTypes.CREATE_EVENT_REQUEST, createEvent),
    takeLatest(BrowseHostsTypes.BROWSE_HOSTS_REQUEST, browseHosts),
    takeLatest(GuardianTypes.GUARDIAN_REQUEST, getGuardians),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
