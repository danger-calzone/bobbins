/**
 * Gets the bobbins of the user
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from '../../utils/request';

import { fetchUsersFailure, fetchUsersSuccess } from './actions';
import { FETCH_USERS } from './constants';

export function* fetchUsersSaga() {
  try {
    const result = yield call(get, '/api/users', {
      isAuthRoute: true,
    });
    console.log('IN SAGA SUCCESS');
    yield put(fetchUsersSuccess({ users: result }));
  } catch (err) {
    console.log('IN SAGA ERROR', err);
    yield put(fetchUsersFailure({ errorMessage: err.message }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* admin() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
}
