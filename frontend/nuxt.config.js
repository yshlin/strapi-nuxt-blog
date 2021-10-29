import axios from "axios";
import { $trans, strapiLocale } from "./utils/locale";

const siteUri = process.env.API_URL || "https://eddie-lin.me/";
const strapiBaseUri = process.env.API_URL || "http://localhost:1337";

export default {
  // ssr: false,
  target: "static",
  env: {
    strapiBaseUri,
    pageSize: 5,
    // Currently articles would be fully preloaded when use in SSG mode
    enableInfiniteScroll: true,
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
  modules: [
    "@nuxtjs/markdownit",
    "@nuxtjs/strapi",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/feed",
    "@nuxtjs/gtm",
  ],
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
  sitemap: {
    hostname: "https://eddie-lin.me",
    // shortcut notation (basic)
    i18n: true,
    routes: async () => {
      let routes = [];
      for (const { code } of this.default.i18n.locales) {
        const sLocale = strapiLocale(code);
        const { data } = await axios.get(
          `${strapiBaseUri}/articles?_locale=${sLocale}`
        );
        for (const article of data) {
          let route = { links: [] };
          route.url = `/articles/${article.title}`;
          route.links.push({
            lang: sLocale,
            url: `/articles/${article.title}`,
          });
          for (const { locale } of article.localizations) {
            let link = { lang: locale };
            const { data } = await axios.get(
              `${strapiBaseUri}/articles?_locale=${locale}&localizations.id=${article.id}`
            );
            link.url = `/${locale}/articles/${data[0].title}`;
            route.links.push(link);
          }
          routes.push(route);
        }
      }
      return routes;
    },
  },
  feed: async () => {
    let feeds = [];
    for (const { code } of this.default.i18n.locales) {
      const localePrefix =
        this.default.i18n.defaultLocale === code ? "" : `/${code}`;
      const sLocale = strapiLocale(code);
      const articles = await axios.get(
        `${strapiBaseUri}/articles?_locale=${sLocale}`
      );
      const home = await axios.get(
        `${strapiBaseUri}/homepage?_locale=${sLocale}`
      );
      let homeFeed = {
        path: `${localePrefix}/feed.xml`,
        cacheTime: 1000 * 60 * 15,
        type: "rss2",
        async create(feed) {
          feed.options = {
            title: home.data.seo.metaTitle,
            description: home.data.seo.metaDescription,
            link: `${siteUri}${localePrefix}/feed.xml`,
          };
          for (const article of articles.data) {
            feed.addItem({
              title: article.title,
              id: article.id,
              link: `${siteUri}/articles/${article.title}`,
              description: article.description,
            });
          }
        },
      };
      feeds.push(homeFeed);
      const categories = await axios.get(
        `${strapiBaseUri}/categories?_locale=${sLocale}`
      );
      const encode = (value) => {
        if ("generate" === process.env.npm_lifecycle_event) {
          return value;
        } else {
          return encodeURIComponent(value);
        }
      };
      for (const category of categories.data) {
        const catArticles = await axios.get(
          `${strapiBaseUri}/articles?_locale=${sLocale}&category.id=${category.id}`
        );
        let catFeed = {
          path: `${localePrefix}/categories/${encode(category.name)}/feed.xml`,
          cacheTime: 1000 * 60 * 15,
          type: "rss2",
          async create(feed) {
            feed.options = {
              title: $trans(code, "category.title", {
                category: category.name,
              }),
              description: $trans(code, "category.description", {
                category: category.name,
              }),
              link: `${siteUri}${localePrefix}/categories/${encode(
                category.name
              )}/feed.xml`,
            };
            for (const catArticle of catArticles.data) {
              feed.addItem({
                title: catArticle.title,
                id: catArticle.id,
                link: `${siteUri}/articles/${catArticle.title}`,
                description: catArticle.description,
              });
            }
          },
        };
        feeds.push(catFeed);
      }
    }
    return feeds;
  },
  gtm: {
    enabled: true,
    id: "GTM-TD59WJK",
    pageTracking: true,
  },
};
