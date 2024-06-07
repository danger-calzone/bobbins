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
  const { navigate, password, username } = payload;
  try {
    const { token } = yield call(post, 'http://localhost:3000/api/login', {
      credentials: 'include',
      payload: { password, username },
    });
    localStorage.setItem('session', token);
    yield put(loginSuccess());
    navigate('/dashboard');
  } catch (err) {
    yield put(loginFailure({ errorMessage: err.message }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}
