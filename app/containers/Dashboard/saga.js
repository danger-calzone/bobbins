/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from '../../utils/request';

import { fetchBobbinsFailure, fetchBobbinsSuccess } from './actions';

import { FETCH_BOBBINS } from './constants';

/**
 * Github repos request/response handler
 */
export function* fetchBobbinsSaga() {
  try {
    const token = JSON.parse(window.localStorage.getItem('session'));
    if (!token) throw new Error();
    const result = yield call(
      get,
      `http://localhost:3000/api/bobbins/owner/${token.id}`,
      { isAuthRoute: true },
    );
    yield put(fetchBobbinsSuccess({ bobbins: result }));
  } catch (err) {
    yield put(fetchBobbinsFailure({ errorMessage: 'FAILURE' }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(FETCH_BOBBINS, fetchBobbinsSaga);
}
