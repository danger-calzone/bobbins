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

export { makeSelectBobbin, selectBobbin };
