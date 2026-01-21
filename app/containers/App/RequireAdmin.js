import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RequireAuth from './RequireAuth';
import { ROLE } from './roles';

export default function RequireAdmin({ children }) {
  const role = useSelector(state => state.global.role);

  const isAdmin = Number(role) === ROLE.ADMIN;

  return (
    <RequireAuth>
      {isAdmin ? children : <Navigate to="/" replace />}
    </RequireAuth>
  );
}