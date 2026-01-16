/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const UPDATE_SESSION = 'bobbins/App/UPDATE_SESSION';

export const LOGOUT = 'bobbins/App/LOGOUT';
export const LOGOUT_FAILURE = 'bobbins/App/LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'bobbins/App/LOGOUT_SUCCESS';

export const LOGIN_REQUEST = 'bobbins/App/LOGIN_REQUEST';
export const LOGIN_FAILURE = 'bobbins/App/LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'bobbins/App/LOGIN_SUCCESS';