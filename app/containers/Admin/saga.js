/**
 * Gets the bobbins of the user
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { get, post } from '../../utils/request';

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
    const result = yield call(post, 'http://localhost:3000/api/users', {
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
    const result = yield call(get, 'http://localhost:3000/api/roles', {
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
