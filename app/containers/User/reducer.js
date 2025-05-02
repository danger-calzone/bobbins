import produce from 'immer';
import {
  FETCH_BOBBINS,
  FETCH_BOBBINS_FAILURE,
  FETCH_BOBBINS_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  error: '',
  bobbins: [],
  username: 'test',
  status: 'idle',
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_BOBBINS:
        draft.status = 'loading';
        draft.error = initialState.error;
        break;
      case FETCH_BOBBINS_FAILURE:
        draft.status = 'rejected';
        draft.error = action.payload.errorMessage;
        break;
      case FETCH_BOBBINS_SUCCESS:
        draft.status = 'resolved';
        draft.bobbins = action.payload.bobbins;
        break;
    }
  });

export default dashboardReducer;
