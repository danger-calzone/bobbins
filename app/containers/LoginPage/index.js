/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';

import FormWrapper from './FormWrapper';
import { loginRequest, onChange, resetErrors, resetForm } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectError,
  makeSelectPassword,
  makeSelectUsername,
  makeSelectStatus,
  makeSelectSuccess,
} from './selectors';

const key = 'login';

const LoginPage = ({
  error,
  dispatchLoginRequest,
  dispatchOnChange,
  dispatchResetErrors,
  dispatchResetForm,
  password,
  username,
  status,
  success,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const navigate = useNavigate();

  useEffect(() => () => dispatchResetForm(), []);

  return (
    <FormWrapper>
      <br />
      {error && (
        <Alert severity="error" sx={{ marginBottom: '1rem' }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ marginBottom: '1rem' }}>
          {success}
        </Alert>
      )}
      <FormControl>
        <InputLabel htmlFor="filled-adornment-Username">Username</InputLabel>
        <OutlinedInput
          id="login-username"
          label="Username"
          onChange={e =>
            dispatchOnChange({ input: 'username', value: e.target.value })
          }
          onFocus={dispatchResetErrors}
          placeholder="required"
          value={username}
        />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="filled-adornment-Password">Password</InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          id="login-password"
          label="Password"
          onChange={e =>
            dispatchOnChange({ input: 'password', value: e.target.value })
          }
          onFocus={dispatchResetErrors}
          placeholder="required"
          type={showPassword ? 'text' : 'password'}
          value={password}
        />
      </FormControl>
      <LoadingButton
        loading={status === 'loading'}
        onClick={() => dispatchLoginRequest({ navigate, password, username })}
      >
        <span>Login</span>
      </LoadingButton>
    </FormWrapper>
  );
};

LoginPage.propTypes = {
  error: PropTypes.string,
  dispatchLoginRequest: PropTypes.func.isRequired,
  dispatchOnChange: PropTypes.func.isRequired,
  dispatchResetErrors: PropTypes.func.isRequired,
  dispatchResetForm: PropTypes.func.isRequired,
  password: PropTypes.string,
  username: PropTypes.string,
  status: PropTypes.string.isRequired,
  success: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  password: makeSelectPassword(),
  username: makeSelectUsername(),
  status: makeSelectStatus(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = dispatch => ({
  dispatchLoginRequest: ({ navigate, password, username }) =>
    dispatch(loginRequest({ navigate, password, username })),
  dispatchOnChange: ({ input, value }) => dispatch(onChange({ input, value })),
  dispatchResetErrors: () => dispatch(resetErrors()),
  dispatchResetForm: () => dispatch(resetForm()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
