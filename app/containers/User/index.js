/*
 * Users
 *
 * Renders a list of all users
 *
 */

import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';

import { useAuth } from 'utils/useAuth';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import AsyncRender from '../../components/AsyncRender';
// import { fetchUsers } from './actions';
// import reducer from './reducer';
// import saga from './saga';
// import {
//   makeSelectError,
//   makeSelectStatus,
//   makeSelectUsers,
// } from './selectors';

const key = 'user';

const User = ({ dispatchFetchUsers, error, status, users }) => {
  // useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });
  const isAuthenticated = useAuth();

  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatchFetchUsers();
  //   }
  // }, []);

  return (
    <AsyncRender
      Component={<ul>user page</ul>}
      error={error}
      isAuthenticated={isAuthenticated}
      isError={!!error}
      isLoading={status === 'loading' || status === 'idle'}
      PublicComponent={<div>Please log in to view.</div>}
    />
  );
};

User.propTypes = {
  dispatchFetchUsers: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // error: makeSelectError(),
  // status: makeSelectStatus(),
  // users: makeSelectUsers(),
});

const mapDispatchToProps = dispatch => ({
  // dispatchFetchUsers: () => dispatch(fetchUsers()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(User);
