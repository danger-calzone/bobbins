/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from '../../utils/request';

import { updateSession } from './actions';

import { LOGOUT } from './constants';

/**
 * Github repos request/response handler
 */
export function* logoutSaga({ payload }) {
  const { navigate } = payload;
  try {
    yield call(post, 'http://localhost:3000/api/logout', { payload: {} });
    yield put(updateSession({ isLoggedIn: false }));
    navigate('/dashboard');
  } catch (err) {
    console.log('ERROR SAGA', err);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* logout() {
  yield takeLatest(LOGOUT, logoutSaga);
}
