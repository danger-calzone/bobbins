/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from '../../utils/request';

import { updateSession } from '../App/actions';
import { loginFailure, loginSuccess } from './actions';

import { LOGIN_REQUEST } from './constants';

/**
 * Github repos request/response handler
 */
export function* loginSaga({ payload }) {
  const { history, password, username } = payload;
  try {
    yield call(post, 'http://localhost:3000/api/login', {
      payload: { password, username },
    });
    yield put(loginSuccess());
    yield put(updateSession({ isLoggedIn: true }));
    history.push('/dashboard');
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
