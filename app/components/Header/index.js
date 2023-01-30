import React from 'react';
import { FormattedMessage } from 'react-intl';

import HeaderContainer from './HeaderContainer';
import ImageWrapper from './ImageWrapper';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import BobbinsHeader from './bobbinsHeader.png';
import messages from './messages';

function Header() {
  return (
    <HeaderContainer>
      <ImageWrapper>
        <Img src={BobbinsHeader} alt="Bobbins Logo" />
      </ImageWrapper>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.owners} />
        </HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.customization} />
        </HeaderLink>
        <HeaderLink to="/about">
          <FormattedMessage {...messages.about} />
        </HeaderLink>
      </NavBar>
    </HeaderContainer>
  );
}

export default Header;
