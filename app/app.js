import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FontFaceObserver from 'fontfaceobserver';
import 'sanitize.css/sanitize.css';

// Import Language Provider and store configuration
import LanguageProvider from 'containers/LanguageProvider';
import configureStore from './configureStore';
import { translationMessages } from './i18n';
import routes from 'containers/App/routes';

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

const router = createBrowserRouter(routes);

// Function to render the app
const render = messages => {
  root.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <RouterProvider router={router} />
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
