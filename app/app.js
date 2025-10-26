import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import 'sanitize.css/sanitize.css';

// Import all components and containers
import AboutPage from 'containers/AboutPage/Loadable';
import BobbinPage from 'containers/BobbinPage/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import LoginPage from 'containers/LoginPage';
import Navigation from 'containers/Navigation';
import Users from 'containers/Users/Loadable';
import User from 'containers/User/Loadable';
import Admin from 'containers/Admin/Loadable';
import Upload from 'containers/Upload';

// Import Language Provider and store configuration
import LanguageProvider from 'containers/LanguageProvider';
import configureStore from './configureStore';
import { useAuth } from './utils/useAuth';
import { translationMessages } from './i18n';

import ProtectedRoute from './components/ProtectedRoute';

// Font observer for Open Sans
const openSansObserver = new FontFaceObserver('Open Sans', {});
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const initialState = {};
const store = configureStore(initialState);
const container = document.getElementById('app');
const root = createRoot(container);

const createRoutes = isAdmin => [
  {
    path: '/',
    element: <Navigation />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'features', element: <FeaturePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'bobbins/:bobbinId', element: <BobbinPage /> },
      { path: 'users', element: <Users /> },
      { path: 'users/:userId', element: <User /> },
      ...(isAdmin
        ? [
            {
              path: 'admin',
              element: (
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              ),
            },
            {
              path: 'upload',
              element: (
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              ),
            },
          ]
        : []),
    ],
  },
];

// AuthWrapper component to check user role and create routes
const AuthWrapper = () => {
  const { isAuthenticated, role } = useAuth();
  const isAdmin = isAuthenticated && role === 'admin';

  const routes = useMemo(() => createRoutes(isAdmin), [isAdmin]);
  const router = useMemo(() => createBrowserRouter(routes), [routes]);

  return <RouterProvider router={router} />;
};

// Function to render the app
const render = messages => {
  root.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <AuthWrapper />
      </LanguageProvider>
    </Provider>,
  );
};

// Initialize the application
if (module.hot) {
  module.hot.accept(['./i18n', 'containers/App'], () => {
    root.unmount();
    render(translationMessages);
  });
}

// Initial render
render(translationMessages);

// Service worker for production
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}
