/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from '../../utils/request';

import { fetchBobbinsFailure, fetchBobbinsSuccess } from './actions';

import { FETCH_BOBBINS } from './constants';

/**
 * Github repos request/response handler
 */
export function* fetchBobbinsSaga({ payload }) {
  const { username } = payload;
  try {
    // yield call(post, 'http://localhost:3000/api/login', {
    //   payload: { password, username },
    // });
    // yield put(loginSuccess());
    // yield put(updateSession({ isLoggedIn: true }));
    console.log('in dashboard saga');
    yield put(fetchBobbinsSuccess());
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
