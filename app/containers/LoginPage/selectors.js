/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.login || initialState;

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

export { selectLogin, makeSelectPassword, makeSelectUsername };
