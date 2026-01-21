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
import { connect } from 'react-redux';
import { compose } from 'redux';

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

function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="Bobbins"
        defaultTitle="Bobbins"
      >
        <meta name="description" content="Bobbins Website" />
      </Helmet>
      {/* <Header /> */}
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}

const withConnect = connect(
  null,
  null,
);

export default compose(withConnect)(App);
