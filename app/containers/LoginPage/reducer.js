import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  ON_CHANGE,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  password: '',
  username: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.loading = true;
        break;
      case LOGIN_FAILURE:
        draft.loading = false;
        break;
      case LOGIN_SUCCESS:
        draft.loading = false;
        break;
      case ON_CHANGE:
        draft[action.input] = action.value;
        break;
    }
  });

export default loginReducer;
