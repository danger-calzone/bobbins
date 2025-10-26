/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';

// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
// import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
// import { changeUsername } from './actions';
// import { makeSelectUsername } from './selectors';
// import reducer from './reducer';
// import saga from './saga';

// const key = 'home';

export function HomePage() {
  // useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>Hello it's me</div>
    </article>
  );
}

const withConnect = connect(
  null,
  null,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
