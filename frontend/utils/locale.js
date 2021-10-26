const MESSAGES = {
  en: require("../lang/en"),
  "zh-TW": require("../lang/zh-TW"),
};

const STRAPI_LOCALE_MAPPING = {
  "zh-TW": "zh-Hant-TW",
};

const VUE_LOCALE_MAPPING = {
  "zh-Hant-TW": "zh-TW",
};

export function strapiLocale(locale) {
  if (locale in STRAPI_LOCALE_MAPPING) {
    return STRAPI_LOCALE_MAPPING[locale];
  }
  return locale;
}

export function vueLocale(locale) {
  if (locale in VUE_LOCALE_MAPPING) {
    return VUE_LOCALE_MAPPING[locale];
  }
  return locale;
}

export function $trans(locale, messageKey, args) {
  let msg = MESSAGES[locale].default[messageKey];
  for (const i in args) {
    msg = msg.replace(`{${i}}`, args[i]);
  }
  return msg;
}
