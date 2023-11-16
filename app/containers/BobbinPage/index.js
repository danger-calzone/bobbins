/*
 * BobbinPage
 *
 */

import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';

import { fetchBobbin } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectBobbin } from './selectors';

const key = 'bobbinPage';

const BobbinPage = ({ bobbinInfo, dispatchFetchBobbin }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { bobbinId } = useParams();
  console.log('TEST', bobbinId);

  useEffect(() => {
    dispatchFetchBobbin();
  }, [dispatchFetchBobbin]);

  return <>{bobbinInfo.name}</>;
};

BobbinPage.propTypes = {
  bobbinInfo: PropTypes.object.isRequired,
  dispatchFetchBobbin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bobbinInfo: makeSelectBobbin(),
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchBobbin: () => dispatch(fetchBobbin()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BobbinPage);
