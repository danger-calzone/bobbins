import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../LoadingIndicator';

const AsyncRender = ({
  Component,
  error,
  isAuthenticated,
  isError,
  isLoading,
  PublicComponent,
}) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <>An error has occurred: `${error || 'Please try again later.'}`</>;
  }

  if (isAuthenticated && Component) {
    return <>{Component}</>;
  }

  return PublicComponent;
};

AsyncRender.propTypes = {
  Component: PropTypes.node,
  error: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  PublicComponent: PropTypes.node,
};

export default AsyncRender;
