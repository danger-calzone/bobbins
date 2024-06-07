/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from '../../utils/request';
import { logoutFailure } from '../Dashboard/actions';
import { logoutSuccess } from '../LoginPage/actions';
import { LOGOUT } from './constants';

/**
 * Github repos request/response handler
 */
export function* logoutSaga({ payload }) {
  const { navigate } = payload;
  try {
    yield call(post, 'http://localhost:3000/api/logout', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('session')}`,
      },
      payload: {},
    });
    localStorage.removeItem('session');
    yield put(logoutSuccess({ successMessage: 'Logged Out!' }));
    navigate('/login');
  } catch (err) {
    yield put(
      logoutFailure({
        errorMessage: 'There was an issue with logout, please try again later.',
      }),
    );
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* logout() {
  yield takeLatest(LOGOUT, logoutSaga);
}
