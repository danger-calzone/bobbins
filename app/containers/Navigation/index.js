// Navigation.jsx
import React from 'react';
import { connect } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useAuth } from 'utils/useAuth';

import BobbinsHeader from './bobbinsHeader.png';
import Break from './Break';
import HeaderContainer from './HeaderContainer';
import ImageWrapper from './ImageWrapper';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import LinkWrapper from './LinkWrapper';
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

function Navigation({ dispatchLogout }) {
  useInjectSaga({ key, saga });
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth(); // Using isAuthenticated from useAuth hook
  console.log('NAV ROLE', role);
  return (
    <AppWrapper>
      <HeaderContainer>
        <ImageWrapper>
          <Img src={BobbinsHeader} alt="Bobbins Logo" />
        </ImageWrapper>
        <NavBar>
          <LinkWrapper>
            <HeaderLink hasTopMargin to="/dashboard">
              Home
            </HeaderLink>
            <HeaderLink hasTopMargin to="/features">
              Features
            </HeaderLink>
            <HeaderLink hasTopMargin to="/about">
              About
            </HeaderLink>
            {isAuthenticated ? (
              <LogoutButton
                onClick={() => dispatchLogout({ navigate })}
                variant="contained"
              >
                Logout
              </LogoutButton>
            ) : (
              <HeaderLink to="/login">Login</HeaderLink>
            )}
          </LinkWrapper>
          <Break />
          {role === 'admin' && (
            <LinkWrapper>
              <HeaderLink to="register">Register</HeaderLink>
              <HeaderLink to="upload">Upload</HeaderLink>
            </LinkWrapper>
          )}
        </NavBar>
      </HeaderContainer>
      <Outlet />
    </AppWrapper>
  );
}

Navigation.propTypes = {
  dispatchLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchLogout: ({ navigate }) => dispatch(logout({ navigate })),
});

export default connect(
  null,
  mapDispatchToProps,
)(Navigation);
