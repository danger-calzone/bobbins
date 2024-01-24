/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';
import AboutPage from 'containers/AboutPage/Loadable';
import BobbinPage from 'containers/BobbinPage/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
// import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage';
import Navigation from 'containers/Navigation';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'features',
        element: <FeaturePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'bobbins/:bobbinId',
        element: <BobbinPage />,
      },
    ],
  },
]);

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const container = document.getElementById('app');
const root = createRoot(container);

const render = messages => {
  root.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </LanguageProvider>
    </Provider>,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    root.unmount();
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    ) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
