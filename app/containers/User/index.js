/*
 * Users
 *
 * Renders a list of all users
 *
 */

import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from 'utils/useAuth';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import AsyncRender from '../../components/AsyncRender';
import BobbinsThumbnail from './BobbinsThumbnail';
import { fetchBobbins } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectBobbins,
  makeSelectError,
  makeSelectStatus,
} from './selectors';

const key = 'user';

const User = ({ bobbins, dispatchFetchBobbins, error, status }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const isAuthenticated = useAuth();
  const { userId } = useParams();

  useEffect(() => {
    if (status === 'idle') {
      dispatchFetchBobbins({ userId });
    }
  }, []);

  return (
    <AsyncRender
      Component={
        <div>
          {bobbins.map(({ id, imageSrc }) => (
            <Link
              key={`bobbin-link-${id}`}
              to={`${window.location.origin}/bobbins/${id}`}
            >
              <BobbinsThumbnail
                key={`bobbin-${id}`}
                alt={`img-test-${id}`}
                src={imageSrc}
              />
            </Link>
          ))}
        </div>
      }
      error={error}
      isAuthenticated={isAuthenticated}
      isError={!!error}
      isLoading={status === 'loading' || status === 'idle'}
      PublicComponent={<div>Please log in to view.</div>}
    />
  );
};

User.propTypes = {
  bobbins: PropTypes.array.isRequired,
  dispatchFetchBobbins: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bobbins: makeSelectBobbins(),
  error: makeSelectError(),
  status: makeSelectStatus(),
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchBobbins: ({ userId }) => dispatch(fetchBobbins({ userId })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(User);
