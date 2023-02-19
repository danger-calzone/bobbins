import produce from 'immer';
import { ON_CHANGE } from './constants';

// The initial state of the App
export const initialState = {
  password: '',
  username: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ON_CHANGE:
        draft[action.input] = action.value;
        break;
    }
  });

export default homeReducer;
