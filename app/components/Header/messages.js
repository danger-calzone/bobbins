/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  owners: {
    id: `${scope}.owners`,
    defaultMessage: 'Owners',
  },
  customization: {
    id: `${scope}.customization`,
    defaultMessage: 'Customization',
  },
  about: {
    id: `${scope}.about`,
    defaultMessage: 'About Us',
  },
});
