/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormWrapper from './FormWrapper';
import { onChange } from './actions';
import reducer from './reducer';

const key = 'login';

export function LoginPage() {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      });
      const { token } = response.data;
      // console.log(token);
      // login(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormWrapper>
      <br />
      <TextField
        id="login-username"
        label="Username"
        onChange={e => setUsername(e.target.value)}
        placeholder="required"
        value={username}
        variant="outlined"
      />
      <br />
      <TextField
        id="login-password"
        label="Password"
        onChange={e => setPassword(e.target.value)}
        placeholder="required"
        value={password}
        variant="outlined"
      />
      <Button onClick={handleLogin}>Login</Button>
    </FormWrapper>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchOnChange: (evt, input) =>
      dispatch(onChange({ input, value: evt.target.value })),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
