/*
 * Dashboard
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Dashboard = () => <div>test</div>;

const withConnect = connect(
  null,
  null,
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
