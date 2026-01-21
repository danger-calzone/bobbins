/**
 * Login selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.login || initialState;

const makeSelectError = () =>
  createSelector(
    selectLogin,
    loginState => loginState.error,
  );

const makeSelectPassword = () =>
  createSelector(
    selectLogin,
    loginState => loginState.password,
  );

const makeSelectUsername = () =>
  createSelector(
    selectLogin,
    loginState => loginState.username,
  );

const makeSelectStatus = () =>
  createSelector(
    selectLogin,
    loginState => loginState.status,
  );

const makeSelectSuccess = () =>
  createSelector(
    selectLogin,
    loginState => loginState.success,
  );

export {
  selectLogin,
  makeSelectError,
  makeSelectPassword,
  makeSelectUsername,
  makeSelectStatus,
  makeSelectSuccess
};
