/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from '../../utils/request';

import { loginFailure, loginSuccess } from './actions';
import { LOGIN_REQUEST } from './constants';

/**
 * Github repos request/response handler
 */
export function* loginSaga({ payload }) {
  try {
    yield call(post, 'http://localhost:3000/api/login', {
      payload,
    });
    yield put(loginSuccess());
    window.location.href = '/dashboard';
  } catch (err) {
    yield put(loginFailure(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
