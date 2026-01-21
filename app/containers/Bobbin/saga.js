/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from '../../utils/request';
import { API_BASE_URL } from '../../src/config';

import { fetchBobbinFailure, fetchBobbinSuccess } from './actions';

import { FETCH_BOBBIN } from './constants';

/**
 * Github repos request/response handler
 */
export function* fetchBobbinSaga({ payload }) {
  try {
    const { bobbinId } = payload;
    const result = yield call(get, `${API_BASE_URL}/bobbins/${bobbinId}`, {
      isAuthRoute: true,
    });
    yield put(fetchBobbinSuccess({ bobbinInfo: result }));
  } catch (err) {
    yield put(fetchBobbinFailure({ errorMessage: 'FAILURE' }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(FETCH_BOBBIN, fetchBobbinSaga);
}
