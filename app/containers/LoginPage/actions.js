import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  ON_CHANGE,
} from './constants';

export function loginRequest({ password, username }) {
  return { payload: { password, username }, type: LOGIN_REQUEST };
}

export function loginFailure() {
  return { type: LOGIN_FAILURE };
}

export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
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
    type: ON_CHANGE,
    input,
    value,
  };
}
