/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectBobbin = state => state.bobbinPage || initialState;

const makeSelectBobbin = () =>
  createSelector(
    selectBobbin,
    bobbinState => bobbinState.bobbinInfo,
  );

const makeSelectError = () =>
  createSelector(
    selectBobbin,
    bobbinState => bobbinState.error,
  );

const makeSelectStatus = () =>
  createSelector(
    selectBobbin,
    bobbinState => bobbinState.status,
  );

// const makeSelectBobbinInfo = () =>
//   createSelector(
//     selectBobbin,
//     bobbinState => {
//       const { bobbinInfo } = bobbinState;
      
//     }
//   );

export { makeSelectBobbin, makeSelectError, makeSelectStatus };
