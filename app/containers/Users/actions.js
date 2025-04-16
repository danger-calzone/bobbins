import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from './constants';

export function fetchUsers() {
  return { type: FETCH_USERS };
}

export function fetchUsersFailure({ errorMessage }) {
  return { payload: { errorMessage }, type: FETCH_USERS_FAILURE };
}

export function fetchUsersSuccess({ users }) {
  return { payload: { users }, type: FETCH_USERS_SUCCESS };
}
