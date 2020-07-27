import { put, select } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import { is } from 'ramda'
import BrowseHostActions from '../Redux/BrowseHostsRedux'
import GuardianActions from '../Redux/GuardianRedux'

// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar

// process STARTUP actions
export function* startup(action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: selectAvatar
    })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
        someNormalFunction: selectAvatar
      }
    })
  }
  const avatar = yield select(selectAvatar)
  yield put(BrowseHostActions.browseHostsRequest())
  yield put(GuardianActions.guardianRequest())
  // only get if we don't have it yet
  if (!is(String, avatar)) {
    yield put(GithubActions.userRequest('GantMan'))
  }
}
