import {
  FETCH_USER_ROLES,
  FETCH_USER_ROLES_FAILURE,
  FETCH_USER_ROLES_SUCCESS,
  ON_CHANGE,
  REGISTER_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  RESET_ERRORS,
} from './constants';

export function fetchUserRoles() {
  return { type: FETCH_USER_ROLES };
}

export function fetchUserRolesFailure() {
  return { type: FETCH_USER_ROLES_FAILURE };
}

export function fetchUserRolesSuccess({ roles }) {
  return { payload: { roles }, type: FETCH_USER_ROLES_SUCCESS };
}

export function onChange({ input, value }) {
  return { payload: { input, value }, type: ON_CHANGE };
}

export function registerUser({ password, role, username }) {
  return { payload: { password, role, username }, type: REGISTER_USER };
}

export function registerUserFailure({ errorMessage }) {
  return { payload: { errorMessage }, type: REGISTER_USER_FAILURE };
}

export function registerUserSuccess({ userInfo }) {
  return { payload: { userInfo }, type: REGISTER_USER_SUCCESS };
}

export function resetErrors() {
  return { type: RESET_ERRORS };
}
