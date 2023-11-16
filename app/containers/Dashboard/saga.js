/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
// import { post } from '../../utils/request';

import { fetchBobbinsFailure, fetchBobbinsSuccess } from './actions';

import { FETCH_BOBBINS } from './constants';

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
    const testImages = [
      {
        id: 1,
        image:
          'https://im1.ponyisland.net/?img=proxy&url=https%3A%2F%2Fphotos.smugmug.com%2FBobbins-for-Certing%2FMaxxie%2Fi-hj7L2zf%2F0%2Fb1058a04%2FO%2FInfernalStar_Charon.png&p=9f5e8',
      },
      {
        id: 2,
        image:
          'https://im1.ponyisland.net/?img=proxy&url=https%3A%2F%2Fphotos.smugmug.com%2FBobbins-for-Certing%2FMaxxie%2Fi-hj7L2zf%2F0%2Fb1058a04%2FO%2FInfernalStar_Charon.png&p=9f5e8',
      },
    ];
    yield put(fetchBobbinsSuccess({ images: testImages }));
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
