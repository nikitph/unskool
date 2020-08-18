import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password', 'alertfunc', 'nav'],
  socialLoginRequest: ['token', 'alertfunc', 'nav'],
  loginSuccess: ['payload'],
  loginFailure: ['payload']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  googleFetching: null,
  facebookFetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

export const requestGoogle = (state, action) => {
  let googleFetching = null, facebookFetching = null
  if(action.token){
    if(action.token.signInMethod === 'facebook.com'){
      facebookFetching = true
    } else {
      googleFetching = true
    }
  }
  return state.merge({ googleFetching, facebookFetching, payload: null })
}
  
// successful api lookup
export const success = (state, action) => {
  console.log("state", state);
  console.log("action", action);
  const { payload } = action
  return state.merge({ fetching: false, googleFetching: false, facebookFetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state, error) =>
  state.merge({ fetching: false, error, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.SOCIAL_LOGIN_REQUEST]: requestGoogle,
})
