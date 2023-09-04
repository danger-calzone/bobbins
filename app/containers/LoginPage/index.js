/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import FormWrapper from './FormWrapper';
import { loginRequest, onChange, resetErrors } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectError,
  makeSelectPassword,
  makeSelectUsername,
  makeSelectStatus,
} from './selectors';

const key = 'login';

const LoginPage = ({
  error,
  dispatchLoginRequest,
  dispatchOnChange,
  dispatchResetErrors,
  history,
  password,
  username,
  status,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  return (
    <FormWrapper>
      <br />
      {error && (
        <Alert severity="error" sx={{ marginBottom: '1rem' }}>
          {error}
        </Alert>
      )}
      <TextField
        id="login-username"
        label="Username"
        onChange={e =>
          dispatchOnChange({ input: 'username', value: e.target.value })
        }
        onFocus={dispatchResetErrors}
        placeholder="required"
        value={username}
        variant="outlined"
      />
      <br />
      <TextField
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
        variant="outlined"
      />
      <LoadingButton
        loading={status === 'loading'}
        onClick={() => dispatchLoginRequest({ history, password, username })}
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
  history: PropTypes.object,
  password: PropTypes.string,
  username: PropTypes.string,
  status: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  password: makeSelectPassword(),
  username: makeSelectUsername(),
  status: makeSelectStatus(),
});

const mapDispatchToProps = dispatch => ({
  dispatchLoginRequest: ({ history, password, username }) =>
    dispatch(loginRequest({ history, password, username })),
  dispatchOnChange: ({ input, value }) => dispatch(onChange({ input, value })),
  dispatchResetErrors: () => dispatch(resetErrors()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
