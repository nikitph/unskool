import { call, put } from 'redux-saga/effects'
import CreateGuardianActions from '../Redux/CreateGuardianRedux'
import { dbService } from '../Services/Firebase'
import { NavigationActions } from 'react-navigation'
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
    const gKey = yield call(dbService.database.create, 'guardians', { uid,
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
      latlong})
    yield put(CreateGuardianActions.createGuardianSuccess({ gKey }))
    const resetAction = nav.reset([NavigationActions.navigate({ routeName: 'DashboardScreen' })], 0)
    yield call(nav.dispatch, resetAction)
  } catch (error) {
    yield put(CreateGuardianActions.createGuardianFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
