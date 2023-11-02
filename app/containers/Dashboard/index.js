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

  useEffect(() => {
    // status check
    dispatchFetchBobbins();
  }, [dispatchFetchBobbins]);

  // secondary nav menu, maybe first one is public and second one is private
  // Bobbins page / profile for now
  return (
    <>
      <H1>{`${username}'s bobbins`}</H1>
      <BobbinsWrapper>
        {bobbins.map((bobbin, i) => (
          <BobbinsThumbnail
            key={`${username}-bobbin-${i + 1}`}
            alt={`img-test-${i + 1}`}
            src={bobbin}
          />
        ))}
      </BobbinsWrapper>
    </>
  );
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
