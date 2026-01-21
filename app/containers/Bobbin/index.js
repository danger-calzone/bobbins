/*
 * Bobbin
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
import { formatNestedDescriptions } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectBobbin,
  makeSelectError,
  makeSelectStatus,
} from './selectors';
import AsyncRender from '../../components/AsyncRender';

import BobbinPageWrapper from './BobbinPageWrapper';
import BobbinInfoHeading from './BobbinInfoHeading';
import BobbinImage from './BobbinImage';
import BobbinInfoContent from './BobbinInfoContent';

const key = 'bobbinPage';

const BobbinPage = ({ bobbinInfo, dispatchFetchBobbin, error, status }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { bobbinId } = useParams();

  useEffect(() => {
    dispatchFetchBobbin({ bobbinId });
  }, [dispatchFetchBobbin]);

  // add specials display
  return (
    <AsyncRender
      Component={
        <BobbinPageWrapper>
          <BobbinImage src={bobbinInfo.imageSrc} />
          <div>
            <BobbinInfoHeading>
              Information for {bobbinInfo.name}
            </BobbinInfoHeading>
            <BobbinInfoContent>
              <div>Owner: {bobbinInfo.ownerId}</div>
              <div>
                Artists:{' '}
                {formatNestedDescriptions(bobbinInfo.artists, 'username')}
              </div>
              <div>
                Expression:{' '}
                {formatNestedDescriptions(bobbinInfo.expressions, 'expression')}
              </div>
              <div>
                Mutations:{' '}
                {formatNestedDescriptions(bobbinInfo.mutations, 'mutation')}
              </div>
              <div>
                Clothing:{' '}
                {formatNestedDescriptions(bobbinInfo.clothing, 'clothing')}
              </div>
            </BobbinInfoContent>
          </div>
          <BobbinInfoHeading />
        </BobbinPageWrapper>
      }
      error={error}
      isError={!!error}
      isLoading={status === 'loading' || status === 'idle'}
    />
  );
};

BobbinPage.propTypes = {
  bobbinInfo: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  dispatchFetchBobbin: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bobbinInfo: makeSelectBobbin(),
  error: makeSelectError('error'),
  status: makeSelectStatus('status'),
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchBobbin: ({ bobbinId }) => dispatch(fetchBobbin({ bobbinId })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BobbinPage);
