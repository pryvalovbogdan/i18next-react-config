import i18n from 'i18next';

import main from '@i18n/locales/en/main.json';
import header from '@i18n/locales/en/header.json';
import mainDe from '@i18n/locales/de/main.json';
import headerDe from '@i18n/locales/de/header.json';

import { configI18n } from '@i18n/config.ts';

i18n.init({
  ...configI18n,
  resources: {
    en: {
      main,
      header,
    },
    de: {
      main: mainDe,
      header: headerDe,
    },
  },
});

export default i18n;
