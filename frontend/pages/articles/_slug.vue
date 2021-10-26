<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" xl="6" lg="8" sm="10" xs="12">
        <ArticleCard :article="article" full />
        <v-divider />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getStrapiMedia } from "../../utils/medias";
import { getMetaTags } from "../../utils/seo";
import ArticleCard from "../../components/ArticleCard";
import { strapiLocale, vueLocale } from "../../utils/locale";

export default {
  components: {
    ArticleCard,
  },
  async asyncData({ $strapi, i18n, store, params }) {
    const matchingArticles = await $strapi.find("articles", {
      title: params.slug,
      _locale: strapiLocale(i18n.locale),
    });
    const currentArticle = matchingArticles[0];
    let articleRoute = {};
    for (const localization of currentArticle.localizations) {
      const localeArticles = await $strapi.find("articles", {
        "localizations.id": currentArticle.id,
        _locale: localization.locale,
      });
      articleRoute[vueLocale(localization.locale)] = {
        slug: localeArticles[0].title,
      };
    }
    await store.dispatch("i18n/setRouteParams", articleRoute);
    return {
      article: currentArticle,
      global: await $strapi.find("global", {
        _locale: strapiLocale(i18n.locale),
      }),
    };
  },
  data() {
    return {
      apiUrl: process.env.strapiBaseUri,
    };
  },
  head() {
    const { defaultSeo, favicon, siteName } = this.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      metaTitle: this.article.title,
      metaDescription: this.article.description,
      shareImage: this.article.image,
    };

    return {
      titleTemplate: `%s | ${siteName}`,
      title: fullSeo.metaTitle,
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: getStrapiMedia(favicon.url),
        },
      ],
    };
  },
  methods: {
    getStrapiMedia,
  },
};
</script>
