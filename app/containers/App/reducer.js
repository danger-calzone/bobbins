/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import { produce } from 'immer';
import { LOGOUT_FAILURE, LOGOUT_SUCCESS, UPDATE_SESSION } from './constants';

// The initial state of the App
export const initialState = {
  authChecked: false,
  currentUser: null,
  error: false,
  isAuthenticated: false,
  loading: false,
  role: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGOUT_FAILURE:
        const { errorMessage } = action.payload;
        draft.error = errorMessage;
        break;
      case LOGOUT_SUCCESS:
        draft.isAuthenticated = false;
        draft.roll = null;
        draft.currentUser = false;
        break;
      case UPDATE_SESSION:
        const { isAuthenticated, role, currentUser } = action.payload;
        draft.isAuthenticated = isAuthenticated;
        draft.role = role ?? null;
        if (typeof currentUser !== 'undefined') {
          draft.currentUser = currentUser;
        }
        draft.authChecked = true;
        break;
    }
  });

export default appReducer;
