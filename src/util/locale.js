// @flow

import _ from 'lodash';
import I18n from 'react-native-i18n';

import en from '../../locales/en';

// reg ext to check if a key is missing
const KEY_NOT_FOUND = /\[missing "[a-zA-Z0-9._]*" translation\]/i;


function setDefaultLanguage() {
  // set default language if we don't support your device language
  const supportedLang = _.keys(I18n.translations);
  const localeLang = I18n.locale ? I18n.locale : supportedLang[0];

  const langSupported = _.find(supportedLang, (lang) => {
    return localeLang.startsWith(lang);
  });

  if (!langSupported && supportedLang.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    I18n.locale = supportedLang[0];
  }
}


function translate(key : string, ...params : Array<string|number>) : string {
  const s : string = I18n.t(key);

  if (s.match(KEY_NOT_FOUND)) {
    console.warn('Key not found in localization file: ', s);
  }

  return _.reduce(params, (res, item, idx) => {
    return res.replace(`$${idx}`, item);
  }, s);
}

// e.g. en_GB falls back to en
I18n.fallbacks = true;

// set the translations
I18n.translations = {
  en,
};

setDefaultLanguage();


export default translate;
