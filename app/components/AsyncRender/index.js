import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../LoadingIndicator';

const AsyncRender = ({ Component, error, isError, isLoading }) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <>An error has occurred: `${error || 'Please try again later.'}`</>;
  }

  return Component;
};

AsyncRender.propTypes = {
  Component: PropTypes.node,
  error: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default AsyncRender;
