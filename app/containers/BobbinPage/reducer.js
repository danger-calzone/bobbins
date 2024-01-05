import produce from 'immer';
import {
  FETCH_BOBBIN,
  FETCH_BOBBIN_FAILURE,
  FETCH_BOBBIN_SUCCESS,
} from './constants';

// The initial state of the App
export const initialState = {
  bobbinInfo: {
    name: '',
    owner: '',
    artists: [],
    expression: '',
    mutations: [],
    clothing: [],
    image: '',
  },
  error: '',
  status: 'idle',
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_BOBBIN:
        draft.status = 'loading';
        draft.error = initialState.error;
        draft.bobbinInfo = initialState.bobbinInfo;
        break;
      case FETCH_BOBBIN_FAILURE:
        draft.status = 'rejected';
        draft.error = action.payload.errorMessage;
        break;
      case FETCH_BOBBIN_SUCCESS:
        draft.status = 'resolved';
        draft.bobbinInfo = action.payload.bobbinInfo;
        break;
    }
  });

export default dashboardReducer;
