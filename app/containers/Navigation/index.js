import React, { memo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';

import { makeSelectGlobal } from '../App/selectors';

import HeaderContainer from './HeaderContainer';
import ImageWrapper from './ImageWrapper';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import BobbinsHeader from './bobbinsHeader.png';
import messages from './messages';
import LogoutButton from './LogoutButton';

import saga from '../App/saga';
import { logout } from '../App/actions';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  color: #595959;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const key = 'main';

function Navigation({ dispatchLogout, isLoggedIn }) {
  useInjectSaga({ key, saga });

  const navigate = useNavigate();
  return (
    <AppWrapper>
      <HeaderContainer>
        <ImageWrapper>
          <Img src={BobbinsHeader} alt="Bobbins Logo" />
        </ImageWrapper>
        <NavBar>
          <HeaderLink to="/dashboard">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.customization} />
          </HeaderLink>
          <HeaderLink to="/about">
            <FormattedMessage {...messages.about} />
          </HeaderLink>
          {isLoggedIn ? (
            <LogoutButton
              color="primary"
              onClick={() => dispatchLogout({ navigate })}
              variant="contained"
            >
              Logout
            </LogoutButton>
          ) : (
            <HeaderLink to="/login">
              <FormattedMessage {...messages.login} />
            </HeaderLink>
          )}
        </NavBar>
      </HeaderContainer>
      <Outlet />
    </AppWrapper>
  );
}

Navigation.propTypes = {
  dispatchLogout: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectGlobal('isLoggedIn'),
});

const mapDispatchToProps = dispatch => ({
  dispatchLogout: ({ navigate }) => dispatch(logout({ navigate })),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Navigation);
