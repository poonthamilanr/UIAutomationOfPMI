import { loadMessages } from '@progress/kendo-react-intl';
import i18n from 'i18next';

// The value doesn't really matter, all messages must be defined by sitecore dictionary
export const KENDO_MESSAGES_LANGUAGE = 'en-US';

export const initKendoMessages = () => {
  loadMessages({
    dropdowns: {
      nodata: i18n.t('cert-app.PageComponents.Dropdowns.NoData'),
      clear: i18n.t('cert-app.PageComponents.Dropdowns.Clear'),
    },
  }, KENDO_MESSAGES_LANGUAGE);
};