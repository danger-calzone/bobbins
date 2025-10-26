import { produce } from 'immer';
import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from './constants';

export const initialState = {
  errorMessage: '',
  error: false,
  users: [],
  status: 'idle',
  successMessage: '',
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_USERS:
        draft.status = 'loading';
        break;
      case FETCH_USERS_FAILURE:
        draft.error = true;
        draft.status = 'rejected';
        break;
      case FETCH_USERS_SUCCESS:
        draft.users = action.payload.users;
        draft.status = 'resolved';
        break;
    }
  });

export default userReducer;
