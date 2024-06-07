import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  ON_CHANGE,
  RESET_ERRORS,
} from './constants';

export function loginRequest({ navigate, password, username }) {
  return { payload: { navigate, password, username }, type: LOGIN_REQUEST };
}

export function loginFailure({ errorMessage }) {
  return { payload: { errorMessage }, type: LOGIN_FAILURE };
}

export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

export function logoutSuccess({ successMessage }) {
  return { payload: { successMessage }, type: LOGOUT_SUCCESS };
}

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function onChange({ input, value }) {
  return {
    payload: { input, value },
    type: ON_CHANGE,
  };
}

export function resetErrors() {
  return { type: RESET_ERRORS };
}
