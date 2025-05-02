/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = state => state.user || initialState;

const makeSelectBobbins = () =>
  createSelector(
    selectUser,
    userState => userState.bobbins,
  );

const makeSelectError = () =>
  createSelector(
    selectUser,
    userState => userState.error,
  );

const makeSelectStatus = () =>
  createSelector(
    selectUser,
    userState => userState.status,
  );

export { selectUser, makeSelectBobbins, makeSelectError, makeSelectStatus };
