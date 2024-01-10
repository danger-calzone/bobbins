import React from 'react';
import { Outlet } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import HeaderContainer from './HeaderContainer';
import ImageWrapper from './ImageWrapper';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import BobbinsHeader from './bobbinsHeader.png';
import messages from './messages';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  color: #595959;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

function Header() {
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
          {/* <HeaderLink to="/features">
          <FormattedMessage {...messages.owners} />
        </HeaderLink> */}
          <HeaderLink to="/features">
            <FormattedMessage {...messages.customization} />
          </HeaderLink>
          <HeaderLink to="/about">
            <FormattedMessage {...messages.about} />
          </HeaderLink>
        </NavBar>
      </HeaderContainer>
      <Outlet />
    </AppWrapper>
  );
}

export default Header;
