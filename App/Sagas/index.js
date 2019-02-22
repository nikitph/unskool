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

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { login } from './LoginSagas'
import { signUp } from './SignUpSagas'
import { createGuardian } from './CreateGuardianSagas'
import { createChild } from './CreateChildSagas'

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
    takeLatest(CreateChildTypes.CREATE_CHILD_REQUEST, createChild),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
