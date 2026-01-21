/**
 * Gets the repositories of the user from Github
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { jwtDecode } from 'jwt-decode';

import { post } from '../../utils/request';
import { API_BASE_URL } from '../../src/config';

import {
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  updateSession,
} from './actions';
import { INIT_SESSION, LOGIN_REQUEST, LOGOUT } from './constants';

function* initSessionSaga() {
  const raw = localStorage.getItem('session');
  if (!raw) {
    yield put(updateSession({ currentUser: null, isAuthenticated: false, role: null }));
    return;
  }

  let token;
  try {
    token = JSON.parse(raw);
  } catch {
    localStorage.removeItem('session');
    yield put(updateSession({ currentUser: null, isAuthenticated: false, role: null }));
    return;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch {
    localStorage.removeItem('session');
    yield put(updateSession({ currentUser: null, isAuthenticated: false, role: null }));
    return;
  }

  const expMs = decoded?.exp ? decoded.exp * 1000 : 0;
  if (!expMs || Date.now() >= expMs) {
    localStorage.removeItem('session');
    yield put(updateSession({ currentUser: null, isAuthenticated: false, role: null }));
    return;
  }

  const role = decoded?.role != null ? Number(decoded.role) : null;

  // ✅ Valid session: mark checked and logged in
  yield put(updateSession({ isAuthenticated: true, role }));
}

export function* loginSaga({ payload }) {
  const { navigate, password, username } = payload;
  try {
    const { token } = yield call(post, `${API_BASE_URL}/login`, {
      credentials: 'include',
      payload: { password, username },
    });
    localStorage.setItem('session', JSON.stringify(token));
    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (e) {
      localStorage.removeItem('session');
      throw new Error('Invalid token received');
    }

    yield put(
      updateSession({
        isAuthenticated: true,
        role: Number(decoded.role) ?? null,
        // currentUser: username,
      }),
    );
    yield put(loginSuccess());
    navigate('/dashboard');
  } catch (err) {
    yield put(loginFailure({ errorMessage: 'Invalid username or password' }));
  }
}

export function* logoutSaga({ payload }) {
  const { navigate } = payload;
  try {
    yield call(post, `${API_BASE_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('session')}`,
      },
      payload: {},
    });
    localStorage.removeItem('session');
    yield put(logoutSuccess({ successMessage: 'You have been logged out!' }));
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
export default function* authSaga() {
  yield all([
    takeLatest(INIT_SESSION, initSessionSaga),
    takeLatest(LOGIN_REQUEST, loginSaga),
    takeLatest(LOGOUT, logoutSaga),
  ]);
}
