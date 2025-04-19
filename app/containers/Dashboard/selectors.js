/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboard = state => state.dashboard || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectDashboard,
    loginState => loginState.username,
  );

const makeSelectBobbins = () =>
  createSelector(
    selectDashboard,
    dashboardState => dashboardState.bobbins,
  );

const makeSelectError = () =>
  createSelector(
    selectDashboard,
    dashboardState => dashboardState.error,
  );

const makeSelectStatus = () =>
  createSelector(
    selectDashboard,
    dashboardState => dashboardState.status,
  );

export {
  selectDashboard,
  makeSelectBobbins,
  makeSelectError,
  makeSelectStatus,
  makeSelectUsername,
};
