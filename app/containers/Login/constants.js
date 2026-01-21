/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CLEAR_LOGOUT_MESSAGE = 'bobbins/Login/CLEAR_LOGOUT_MESSAGE';
export const ON_CHANGE = 'bobbins/Login/ON_CHANGE';
export const RESET_ERRORS = 'bobbins/Login/RESET_ERRORS';
export const RESET_FORM = 'bobbins/Login/RESET_FORM';
