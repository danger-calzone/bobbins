import produce from 'immer';
import {
  FETCH_USER_ROLES,
  FETCH_USER_ROLES_FAILURE,
  FETCH_USER_ROLES_SUCCESS,
  ON_CHANGE,
  REGISTER_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  RESET_ERRORS,
} from './constants';

// The initial state of the App
export const initialState = {
  errorMessage: '',
  error: false,
  username: '',
  password: '',
  role: 0,
  roles: [],
  status: 'idle',
  successMessage: '',
};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_USER_ROLES:
        draft.status = 'loading';
        break;
      case FETCH_USER_ROLES_FAILURE:
        draft.error = true;
        draft.status = 'rejected';
        break;
      case FETCH_USER_ROLES_SUCCESS:
        draft.roles = action.payload.roles;
        draft.status = 'resolved';
        break;
      case ON_CHANGE:
        draft[action.payload.input] = action.payload.value;
        break;
      case REGISTER_USER:
        draft.status = 'loading';
        break;
      case REGISTER_USER_FAILURE:
        draft.errorMessage = action.payload.errorMessage;
        draft.status = 'rejected';
        break;
      case REGISTER_USER_SUCCESS:
        draft.successMessage = action.payload.successMessage;
        draft.status = 'resolved';
        break;
      case RESET_ERRORS:
        draft.error = initialState.error;
        draft.errorMessage = initialState.errorMessage;
        break;
    }
  });

export default adminReducer;
