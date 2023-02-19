/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// import {
//   makeSelectRepos,
//   makeSelectLoading,
//   makeSelectError,
// } from 'containers/App/selectors';
// import LoginForm from './Form';
import TextField from '@mui/material/TextField';
// import H2 from 'components/H2';
// import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
import FormWrapper from './FormWrapper';
// import Section from './Section';
// import messages from './messages';
// import { loadRepos } from '../App/actions';
import { onChange } from './actions';
import { makeSelectPassword, makeSelectUsername } from './selectors';
import reducer from './reducer';
// import saga from './saga';

const key = 'login';

export function LoginPage({ dispatchOnChange, password, username }) {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  return (
    <FormWrapper>
      <br />
      <TextField
        id="login-username"
        label="Username"
        onChange={e => dispatchOnChange(e, 'username')}
        placeholder="required"
        value={username}
        variant="outlined"
      />
      <br />
      <TextField
        id="login-password"
        label="Password"
        onChange={e => dispatchOnChange(e, 'password')}
        placeholder="required"
        value={password}
        variant="outlined"
      />
    </FormWrapper>
  );
}

LoginPage.propTypes = {
  dispatchOnChange: PropTypes.func,
  password: PropTypes.string,
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  username: makeSelectUsername(),
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchOnChange: (evt, input) =>
      dispatch(onChange({ input, value: evt.target.value })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
