import {
  ON_CHANGE,
  RESET_ERRORS,
  RESET_FORM,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function onChange({ input, value }) {
  return {
    payload: { input, value },
    type: ON_CHANGE,
  };
}

export function resetErrors() {
  return { type: RESET_ERRORS };
}

export function resetForm() {
  return { type: RESET_FORM };
}
