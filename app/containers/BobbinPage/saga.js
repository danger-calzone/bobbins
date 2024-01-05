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
export function* fetchBobbinSaga() {
  //   const { username } = payload;
  try {
    // yield call(post, 'http://localhost:3000/api/login', {
    //   payload: { password, username },
    // });
    // yield put(loginSuccess());
    // yield put(updateSession({ isLoggedIn: true }));
    const testBobbin = {
      name: 'the coolest',
      owner: 'Meowth',
      artists: ['Meowth', 'littlebee'],
      expression: 'happy probably',
      mutations: ['human half from mermaid', 'human half from minotaur'],
      clothing: ['slutty pumpkin', 'happy halloween'],
      image:
        'https://im1.ponyisland.net/?img=proxy&url=https%3A%2F%2Fphotos.smugmug.com%2FBobbins-for-Certing%2FMaxxie%2Fi-hj7L2zf%2F0%2Fb1058a04%2FO%2FInfernalStar_Charon.png&p=9f5e8',
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
  yield takeLatest(FETCH_BOBBIN, fetchBobbinSaga);
}
