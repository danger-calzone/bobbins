/*
 * AboutPage
 *
 * Info about the team
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import H3 from 'components/H3';
import messages from './messages';

import CertTest from './MeowthCertPrev3.png';
import AboutSection from './AboutSection';
import AboutContent from './AboutContent';
import ArtistImg from './ArtistImg';
import MemberTitle from './MemberTitle';
import Subheader from './Subheader';
import TeamMemberSection from './TeamMemberSection';

export default function AboutPage() {
  return (
    <div>
      <Helmet>
        <title>About Us Page</title>
        <meta name="description" content="About the Bobbins Team" />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <TeamMemberSection>
        <Subheader>
          <FormattedMessage {...messages.subheader} />
        </Subheader>
        <AboutSection>
          <ArtistImg alt="" src={CertTest} />
          <AboutContent>
            <MemberTitle>Meowth</MemberTitle>
            <p>that's right</p>
          </AboutContent>
        </AboutSection>
        <AboutSection>
          <ArtistImg
            alt=""
            src="https://im2.ponyisland.net/?img=association&association=1781&modified=1665875699&size=120"
          />
          <AboutContent>
            <H3>Darian</H3>
						<p>this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test this is a long test </p>
          </AboutContent>
        </AboutSection>
      </TeamMemberSection>
    </div>
  );
}
