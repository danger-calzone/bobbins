/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import AboutPage from 'containers/AboutPage/Loadable';
import BobbinPage from 'containers/BobbinPage/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Header from 'components/Header';

import { makeSelectGlobal } from './selectors';

// import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  color: #595959;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

function App({ isLoggedIn }) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <BrowserRouter>
        <Switch>
          {isLoggedIn && (
            <Route exact path="/dashboard" component={Dashboard} />
          )}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/features" component={FeaturePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/bobbins/:bobbinId" component={BobbinPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectGlobal('isLoggedIn'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(App);
