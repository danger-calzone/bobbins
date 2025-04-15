/**
 * Admin selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdmin = state => state.admin || initialState;

const makeSelectError = () =>
  createSelector(
    selectAdmin,
    usersManagement => usersManagement.error,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectAdmin,
    usersManagement => usersManagement.errorMessage,
  );

const makeSelectPassword = () =>
  createSelector(
    selectAdmin,
    usersManagement => usersManagement.password,
  );

const makeSelectRoles = () =>
  createSelector(
    selectAdmin,
    usersManagement => usersManagement.roles,
  );

const makeSelectStatus = () =>
  createSelector(
    selectAdmin,
    usersManagement => usersManagement.status,
  );

const makeSelectSuccessMessage = () =>
  createSelector(
    selectAdmin,
    usersManagement => usersManagement.successMessage,
  );

const makeSelectUsername = () =>
  createSelector(
    selectAdmin,
    usersManagement => usersManagement.username,
  );

export {
  selectAdmin,
  makeSelectError,
  makeSelectErrorMessage,
  makeSelectPassword,
  makeSelectRoles,
  makeSelectStatus,
  makeSelectSuccessMessage,
  makeSelectUsername,
};
