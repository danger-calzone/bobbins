/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormWrapper from './FormWrapper';
import { loginRequest, onChange } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPassword, makeSelectUsername } from './selectors';

const key = 'login';

const LoginPage = ({
  dispatchLoginRequest,
  dispatchOnChange,
  history,
  password,
  username,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <FormWrapper>
      <br />
      <TextField
        id="login-username"
        label="Username"
        onChange={e =>
          dispatchOnChange({ input: 'username', value: e.target.value })
        }
        placeholder="required"
        value={username}
        variant="outlined"
      />
      <br />
      <TextField
        id="login-password"
        label="Password"
        onChange={e =>
          dispatchOnChange({ input: 'password', value: e.target.value })
        }
        placeholder="required"
        value={password}
        variant="outlined"
      />
      <Button
        onClick={() => dispatchLoginRequest({ history, password, username })}
      >
        Login
      </Button>
    </FormWrapper>
  );
};

LoginPage.propTypes = {
  dispatchLoginRequest: PropTypes.func.isRequired,
  dispatchOnChange: PropTypes.func.isRequired,
  history: PropTypes.object,
  password: PropTypes.string,
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  username: makeSelectUsername(),
});

const mapDispatchToProps = dispatch => ({
  dispatchLoginRequest: ({ history, password, username }) =>
    dispatch(loginRequest({ history, password, username })),
  dispatchOnChange: ({ input, value }) => dispatch(onChange({ input, value })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
