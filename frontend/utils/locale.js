const STRAPI_LOCALE_MAPPING = {
  "zh-TW": "zh-Hant-TW",
};

const VUE_LOCALE_MAPPING = {
  "zh-Hant-TW": "zh-TW",
};

export function strapiLocale(i18n) {
  if (i18n.locale in STRAPI_LOCALE_MAPPING) {
    return STRAPI_LOCALE_MAPPING[i18n.locale];
  }
  return i18n.locale;
}

export function vueLocale(locale) {
  if (locale in VUE_LOCALE_MAPPING) {
    return VUE_LOCALE_MAPPING[locale];
  }
  return locale;
}
