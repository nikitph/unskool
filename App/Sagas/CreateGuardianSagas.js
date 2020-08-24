import { call, put } from 'redux-saga/effects'
import CreateGuardianActions from '../Redux/CreateGuardianRedux'
import { client } from '../Services/Feathers'
import { NavigationActions } from 'react-navigation'
import LoginActions from '../Redux/LoginRedux'
// import { CreateGuardianSelectors } from '../Redux/CreateGuardianRedux'

export function * createGuardian ({gdata, alertfunc, nav}) {
  const {
    uid,
    displayName,
    greeting,
    photoURL,
    email,
    street,
    state,
    city,
    zipCode,
    children,
    gender,
    privacy,
    sponsored,
    specialties,
    languages_spoken,
    latlong
  } = gdata

  try {
    const guardian = yield client.service('guardians')
      .create({
        uid,
        displayName,
        greeting,
        photoURL,
        email,
        street,
        state,
        city,
        zipCode,
        children,
        gender,
        privacy,
        sponsored,
        specialties,
        languages_spoken,
        latlong
      })

    //console.log("this is guardian", guardian)
    yield put(CreateGuardianActions.createGuardianSuccess({gKey: guardian._id}))
    yield put(LoginActions.loginSuccess({uid: guardian.uid, displayName: guardian.displayName, ...guardian}))
    const resetAction = nav.reset([NavigationActions.navigate({ routeName: 'TutorialScreen' })], 0)
    yield call(nav.dispatch, resetAction)
  } catch (error) {
    yield put(CreateGuardianActions.createGuardianFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
