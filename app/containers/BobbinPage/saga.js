/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
// import { post } from '../../utils/request';

import { fetchBobbinFailure, fetchBobbinSuccess } from './actions';

import { FETCH_BOBBIN } from './constants';

/**
 * Github repos request/response handler
 */
export function* fetchBobbinsSaga() {
  //   const { username } = payload;
  try {
    // yield call(post, 'http://localhost:3000/api/login', {
    //   payload: { password, username },
    // });
    // yield put(loginSuccess());
    // yield put(updateSession({ isLoggedIn: true }));
    const testBobbin = {
      name: 'wow coolest bobbin ever',
      owner: 'Meowth',
      'artist(s)': ['test', 'test2'],
      expression: 'happy probably',
    };
    yield put(fetchBobbinSuccess({ bobbinInfo: testBobbin }));
  } catch (err) {
    yield put(fetchBobbinFailure({ errorMessage: 'FAILURE' }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* login() {
  yield takeLatest(FETCH_BOBBIN, fetchBobbinsSaga);
}
