/**
 * Admin selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdmin = state => state.admin || initialState;

const makeSelectError = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.error,
  );

const makeSelectErrorMessage = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.errorMessage,
  );

const makeSelectPassword = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.password,
  );

const makeSelectRoles = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.roles,
  );

const makeSelectStatus = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.status,
  );

const makeSelectSuccessMessage = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.successMessage,
  );

const makeSelectUsername = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.username,
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
