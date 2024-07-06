import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  ON_CHANGE,
  RESET_ERRORS,
  RESET_FORM,
} from './constants';

// The initial state of the App
export const initialState = {
  error: '',
  password: '',
  username: '',
  status: 'idle',
  success: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.status = 'loading';
        break;
      case LOGIN_FAILURE:
        draft.status = 'rejected';
        draft.error = action.payload.errorMessage;
        break;
      case LOGIN_SUCCESS:
        draft.status = 'resolved';
        break;
      case LOGOUT_SUCCESS:
        draft.success = action.payload.successMessage;
        break;
      case ON_CHANGE:
        draft[action.payload.input] = action.payload.value;
        break;
      case RESET_ERRORS:
        draft.error = initialState.error;
        break;
      case RESET_FORM:
        draft.password = initialState.password;
        draft.username = initialState.username;
        break;
    }
  });

export default loginReducer;
