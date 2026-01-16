/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  UPDATE_SESSION,
} from './constants';

export function loginFailure({ errorMessage }) {
  return { payload: { errorMessage }, type: LOGIN_FAILURE };
}

export function loginRequest({ navigate, password, username }) {
  return { payload: { navigate, password, username }, type: LOGIN_REQUEST };
}

export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

export function logout({ navigate }) {
  return {
    payload: { navigate },
    type: LOGOUT,
  };
}

export function logoutFailure({ errorMessage }) {
  return { payload: { errorMessage }, type: LOGOUT_FAILURE };
}

export function logoutSuccess({ successMessage }) {
  return { payload: { successMessage }, type: LOGOUT_SUCCESS };
}


export function updateSession({ isAuthenticated, role }) {
  return {
    payload: { isAuthenticated, role },
    type: UPDATE_SESSION,
  };
}
