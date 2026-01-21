import React from 'react';
import { Outlet } from 'react-router-dom';

import AboutPage from 'containers/AboutPage/Loadable';
import Admin from 'containers/Admin/Loadable';
import Bobbin from 'containers/Bobbin/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
// import FeaturePage from 'containers/FeaturePage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import Login from 'containers/Login/Loadable';
import Navigation from 'containers/Navigation';
import NotFound from 'containers/NotFound';
import Users from 'containers/Users/Loadable';
import User from 'containers/User/Loadable';
import Upload from 'containers/Upload';

import RequireAuth from './RequireAuth';
import RequireAdmin from './RequireAdmin';

const routes = [
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      // Auth Routes
      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: 'bobbins/:bobbinId',
        element: (
          <RequireAuth>
            <Bobbin />
          </RequireAuth>
        ),
      },
      {
        path: 'users',
        element: (
          <RequireAuth>
            <Users />
          </RequireAuth>
        ),
      },
      {
        path: 'users/:userId',
        element: (
          <RequireAuth>
            <User />
          </RequireAuth>
        ),
      },
      // Admin Routes
      {
        path: 'admin',
        element: (
          <RequireAdmin>
            <Admin />
          </RequireAdmin>
        ),
      },
      {
        path: 'upload',
        element: (
          <RequireAdmin>
            <Upload />
          </RequireAdmin>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;