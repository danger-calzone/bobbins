/**
 * Gets the bobbins of the user
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { get, post } from '../../utils/request';
import { API_BASE_URL } from '../../src/config';

import {
  fetchUserRolesFailure,
  fetchUserRolesSuccess,
  registerUserFailure,
  registerUserSuccess,
} from './actions';
import { FETCH_USER_ROLES, REGISTER_USER } from './constants';

export function* registerUserSaga({ payload }) {
  const { navigate, password, role, username } = payload;
  try {
    const result = yield call(post, `${API_BASE_URL}/users`, {
      isAuthRoute: true,
      payload: {
        password,
        username,
        role,
      },
    });
    yield put(
      registerUserSuccess({
        successMessage: 'User Created!',
      }),
    );
  } catch (err) {
    yield put(registerUserFailure({ errorMessage: err.message }));
  }
}

export function* fetchUserRolesSaga() {
  try {
    const result = yield call(get, `${API_BASE_URL}/roles`, {
      isAuthRoute: true,
    });
    yield put(fetchUserRolesSuccess({ roles: result }));
  } catch (err) {
    console.log('IN SAGA', err);
    yield put(fetchUserRolesFailure({ errorMessage: err.message }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* admin() {
  yield takeLatest(REGISTER_USER, registerUserSaga);
  yield takeLatest(FETCH_USER_ROLES, fetchUserRolesSaga);
}
