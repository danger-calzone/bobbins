/**
 * UsersManagement selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUsersManagement = state => state.usersManagement || initialState;

const makeSelectPassword = () =>
  createSelector(
    selectUsersManagement,
    usersManagement => usersManagement.password,
  );

const makeSelectRoles = () =>
  createSelector(
    selectUsersManagement,
    usersManagement => usersManagement.roles,
  );

const makeSelectUsername = () =>
  createSelector(
    selectUsersManagement,
    usersManagement => usersManagement.username,
  );

export {
  selectUsersManagement,
  makeSelectPassword,
  makeSelectRoles,
  makeSelectUsername,
};
