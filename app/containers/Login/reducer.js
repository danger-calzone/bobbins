import { produce } from 'immer';
import {
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
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
