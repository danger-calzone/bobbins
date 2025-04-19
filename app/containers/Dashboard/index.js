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
import { useAuth } from 'utils/useAuth';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { Alert } from '@mui/material';

import AsyncRender from '../../components/AsyncRender';
import { fetchBobbins } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectBobbins,
  makeSelectError,
  makeSelectStatus,
  makeSelectUsername,
} from './selectors';
import H1 from '../../components/H1';
import BobbinsWrapper from './BobbinsWrapper';
import BobbinsThumbnail from './BobbinsThumbnail';

const key = 'dashboard';

const Dashboard = ({
  bobbins,
  error,
  dispatchFetchBobbins,
  status,
  username,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const isAuthenticated = useAuth();

  useEffect(() => {
    // status check
    if (isEmpty(bobbins)) {
      dispatchFetchBobbins();
    }
    // setIsAuthenticated(useAuth);
  }, [dispatchFetchBobbins, isAuthenticated]);

  // secondary nav menu, maybe first one is public and second one is private
  // Bobbins page / profile for now
  return (
    <AsyncRender
      Component={
        <>
          {error && (
            <Alert severity="error" sx={{ marginBottom: '1rem' }}>
              {error}
            </Alert>
          )}
          <H1>{`${username}'s bobbins`}</H1>
          <BobbinsWrapper>
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
          </BobbinsWrapper>
        </>
      }
      isAuthenticated={isAuthenticated}
      isError={!!error}
      isLoading={status === 'loading' || status === 'idle'}
      error={error}
      PublicComponent={<>public view</>}
    />
  );
};

Dashboard.propTypes = {
  bobbins: PropTypes.array.isRequired,
  error: PropTypes.string,
  dispatchFetchBobbins: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bobbins: makeSelectBobbins(),
  error: makeSelectError(),
  status: makeSelectStatus(),
  username: makeSelectUsername(),
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchBobbins: () => dispatch(fetchBobbins()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
