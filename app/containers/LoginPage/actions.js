import { ON_CHANGE } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function onChange({ input, value }) {
  return {
    type: ON_CHANGE,
    input,
    value,
  };
}
