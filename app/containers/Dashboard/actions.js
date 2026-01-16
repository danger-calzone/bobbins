import {
  FETCH_BOBBINS,
  FETCH_BOBBINS_FAILURE,
  FETCH_BOBBINS_SUCCESS,
  LOGOUT_FAILURE,
} from './constants';

export function fetchBobbins() {
  return { type: FETCH_BOBBINS };
}

export function fetchBobbinsFailure({ errorMessage }) {
  return { payload: { errorMessage }, type: FETCH_BOBBINS_FAILURE };
}

export function fetchBobbinsSuccess({ bobbins }) {
  return { payload: { bobbins }, type: FETCH_BOBBINS_SUCCESS };
}
