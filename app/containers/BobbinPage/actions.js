import {
  FETCH_BOBBIN,
  FETCH_BOBBIN_FAILURE,
  FETCH_BOBBIN_SUCCESS,
} from './constants';

export function fetchBobbin() {
  return { type: FETCH_BOBBIN };
}

export function fetchBobbinFailure({ errorMessage }) {
  return { payload: { errorMessage }, type: FETCH_BOBBIN_FAILURE };
}

export function fetchBobbinSuccess({ bobbinInfo }) {
  return { payload: { bobbinInfo }, type: FETCH_BOBBIN_SUCCESS };
}
