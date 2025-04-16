/**
 * Users selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = state => state.users || initialState;

const makeSelectError = () =>
  createSelector(
    selectUser,
    usersState => usersState.error,
  );

const makeSelectStatus = () =>
  createSelector(
    selectUser,
    usersState => usersState.status,
  );

const makeSelectUsers = () =>
  createSelector(
    selectUser,
    usersState => usersState.users,
  );

export { selectUser, makeSelectError, makeSelectStatus, makeSelectUsers };
