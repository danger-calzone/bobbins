/*
 * Dashboard
 *
 */

import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import reducer from './reducer';
import saga from './saga';
import { makeSelectUsername } from './selectors';

const key = 'dashboard';

const Dashboard = ({ username }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  // fetch bobbins

  return (
    <div>
      {`${username}'s bobbins`}
    </div>
  )
};

Dashboard.propTypes = {
  username: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
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
)(Dashboard);
