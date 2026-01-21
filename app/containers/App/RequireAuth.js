import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector(state => state.global.isAuthenticated);
  const authChecked = useSelector(state => state.global.authChecked) ?? false;
  const location = useLocation();

  if (!authChecked) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
