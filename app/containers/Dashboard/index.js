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

import { fetchBobbins } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectBobbins, makeSelectUsername } from './selectors';
import H1 from '../../components/H1';
import BobbinsWrapper from './BobbinsWrapper';
import BobbinsThumbnail from './BobbinsThumbnail';

const key = 'dashboard';

const Dashboard = ({ bobbins, dispatchFetchBobbins, username }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // status check
    if (isEmpty(bobbins)) {
      dispatchFetchBobbins();
    }
  }, [dispatchFetchBobbins]);

  // secondary nav menu, maybe first one is public and second one is private
  // Bobbins page / profile for now
  if (isAuthenticated) {
    return (
      <>
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
    );
  }

  return <>public view</>;
};

Dashboard.propTypes = {
  bobbins: PropTypes.array.isRequired,
  dispatchFetchBobbins: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bobbins: makeSelectBobbins(),
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
