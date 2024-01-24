/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import frCommon from './fr/common.json';
import enCommon from './en/common.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      fr: {
        common: frCommon,
      },
    },
    debug: false,

    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    defaultNS: ['common'],

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
