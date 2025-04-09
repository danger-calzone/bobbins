/**
 * UsersManagement selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUsersManagement = state => state.usersManagement || initialState;

const makeSelectError = () =>
  createSelector(
    selectUsersManagement,
    usersManagement => usersManagement.error,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectUsersManagement,
    usersManagement => usersManagement.errorMessage,
  );

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

const makeSelectStatus = () =>
  createSelector(
    selectUsersManagement,
    usersManagement => usersManagement.status,
  );

const makeSelectSuccessMessage = () =>
  createSelector(
    selectUsersManagement,
    usersManagement => usersManagement.successMessage,
  );

const makeSelectUsername = () =>
  createSelector(
    selectUsersManagement,
    usersManagement => usersManagement.username,
  );

export {
  selectUsersManagement,
  makeSelectError,
  makeSelectErrorMessage,
  makeSelectPassword,
  makeSelectRoles,
  makeSelectStatus,
  makeSelectSuccessMessage,
  makeSelectUsername,
};
