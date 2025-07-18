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

export const LOGIN_REQUEST = 'bobbins/LoginPage/LOGIN_REQUEST';
export const LOGIN_FAILURE = 'bobbins/LoginPage/LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'bobbins/LoginPage/LOGIN_SUCCESS';

export const LOGOUT_SUCCESS = 'bobbins/LoginPage/LOGOUT_SUCCESS';

export const ON_CHANGE = 'bobbins/LoginPage/ON_CHANGE';
export const RESET_ERRORS = 'bobbins/LoginPage/RESET_ERRORS';
export const RESET_FORM = 'bobbins/LoginPage/RESET_FORM';
