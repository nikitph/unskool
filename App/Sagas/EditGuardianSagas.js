import { call, put } from 'redux-saga/effects'
import EditGuardianActions from '../Redux/EditGuardianRedux'
import { dbService } from '../Services/Firebase'
import { NavigationActions } from 'react-navigation'
import LoginActions from '../Redux/LoginRedux'
// import { CreateGuardianSelectors } from '../Redux/CreateGuardianRedux'

export function * editGuardian ({gdata, alertfunc, nav}) {
  const {
    uid,
    displayName,
    greeting,
    profileImage,
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
    latlong
  } = gdata
  try {
    const gKey = yield call(dbService.database.patch, `guardians/${uid}`, {
      uid,
      displayName,
      greeting,
      profileImage,
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
      latlong
    })
    yield put(EditGuardianActions.editGuardianSuccess({ gKey }))
    const guardian = yield call(dbService.database.read, `guardians/${uid}`)
    yield put(LoginActions.loginSuccess({uid, displayName, ...guardian}))
    const resetAction = NavigationActions.navigate({ routeName: 'DashboardScreen' })
    yield call(nav.dispatch, resetAction)
  } catch (error) {
    yield put(EditGuardianActions.editGuardianFailure(error))
    alertfunc('error', 'Error', error.message)
  }
}
