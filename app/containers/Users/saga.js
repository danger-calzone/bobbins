/**
 * Gets the bobbins of the user
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from '../../utils/request';
import { API_BASE_URL } from '../../src/config';

import { fetchUsersFailure, fetchUsersSuccess } from './actions';
import { FETCH_USERS } from './constants';

export function* fetchUsersSaga() {
  try {
    const result = yield call(get, `${API_BASE_URL}/users`, {
      isAuthRoute: true,
    });
    yield put(fetchUsersSuccess({ users: result }));
  } catch (err) {
    yield put(fetchUsersFailure({ errorMessage: err.message }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* admin() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
}
