// import { decode } from 'jsonwebtoken';
/**
 * Gets the bobbins of the user
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from '../../utils/request';
import { API_BASE_URL } from '../../src/config';

import { fetchBobbinsFailure, fetchBobbinsSuccess } from './actions';
import { FETCH_BOBBINS } from './constants';

/**
 * Fetch bobbins for user
 */
export function* fetchBobbinsSaga({ payload }) {
  try {
    const { userId } = payload;
    const result = yield call(get, `${API_BASE_URL}/bobbins/owner/${userId}`, {
      isAuthRoute: true,
    });
    yield put(fetchBobbinsSuccess({ bobbins: result }));
  } catch (err) {
    yield put(fetchBobbinsFailure({ errorMessage: 'FAILURE' }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* dashboard() {
  yield takeLatest(FETCH_BOBBINS, fetchBobbinsSaga);
}
