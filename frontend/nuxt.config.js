const strapiBaseUri = process.env.API_URL || "http://localhost:1337";

export default {
  // ssr: false,
  target: "static",
  env: {
    strapiBaseUri,
  },
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Staatliches",
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["@assets/css/main.scss"],
  plugins: [{ src: "~/plugins/tui-editor.js", ssr: false }],
  modules: ["@nuxtjs/markdownit", "@nuxtjs/strapi", "@nuxtjs/i18n"],
  buildModules: ["@nuxtjs/vuetify"],
  build: {
    babel: {
      compact: true,
      plugins: [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
      ],
    },
    transpile: [
      "@toast-ui/editor",
      "@toast-ui/vue-editor",
      "@toast-ui/editor-plugin-abc",
      "@toast-ui/editor-plugin-alphatex",
      "@toast-ui/editor-plugin-chart",
      "@toast-ui/editor-plugin-code-syntax-highlight",
      "@toast-ui/editor-plugin-mathjax",
      "@toast-ui/editor-plugin-table-merged-cell",
      "@toast-ui/editor-plugin-uml",
      "@coderline/alphatab",
    ],
  },
  strapi: {
    url: strapiBaseUri,
    entities: [
      {
        name: "articles",
        type: "collection",
      },
      {
        name: "categories",
        type: "collection",
      },
      {
        name: "homepage",
        type: "single",
      },
      {
        name: "global",
        type: "single",
      },
    ],
  },
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true,
    html: true,
  },
  vuetify: {
    customVariables: ["~/assets/css/variables.scss"],
    optionsPath: "./vuetify.options.js",
  },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.js",
      },
      {
        code: "zh-TW",
        file: "zh-TW.js",
      },
    ],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "zh-TW",
    vueI18n: {
      fallbackLocale: "zh-TW",
    },
  },
};
