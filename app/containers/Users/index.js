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

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import AsyncRender from '../../components/AsyncRender';
import { fetchUsers } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectError,
  makeSelectStatus,
  makeSelectUsers,
} from './selectors';

const key = 'users';

const Users = ({ dispatchFetchUsers, error, status, users }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (status === 'idle') {
      dispatchFetchUsers();
    }
  }, []);

  return (
    <AsyncRender
      Component={
        <ul>
          {users.map(({ id, username }) => (
            <li>
              <a href={`http://localhost:3000/users/${id}`}>{username}</a>
            </li>
          ))}
        </ul>
      }
      error={error}
      isError={!!error}
      isLoading={status === 'loading' || status === 'idle'}
    />
  );
};

Users.propTypes = {
  dispatchFetchUsers: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  status: makeSelectStatus(),
  users: makeSelectUsers(),
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchUsers: () => dispatch(fetchUsers()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Users);
