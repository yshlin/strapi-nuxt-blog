<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" xl="6" lg="8" sm="10" xs="12">
        <h1>{{ global.siteName }}</h1>
      </v-col>
    </v-row>
    <v-row
      v-for="article in articles"
      :key="article.id"
      justify="center"
      no-gutters
    >
      <v-col cols="12" xl="6" lg="8" sm="10" xs="12">
        <v-divider />
        <ArticleCard :article="article" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getMetaTags } from "../utils/seo";
import { getStrapiMedia } from "../utils/medias";
import ArticleCard from "../components/ArticleCard";
import { strapiLocale } from "../utils/locale";

export default {
  components: {
    ArticleCard,
  },
  async asyncData({ $strapi, i18n }) {
    return {
      articles: await $strapi.find("articles", {
        _locale: strapiLocale(i18n),
      }),
      homepage: await $strapi.find("homepage", {
        _locale: strapiLocale(i18n),
      }),
      global: await $strapi.find("global", {
        _locale: strapiLocale(i18n),
      }),
    };
  },
  head() {
    const { seo } = this.homepage;
    const { defaultSeo, favicon, siteName } = this.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      ...seo,
      metaTitle: this.homepage.hero.title,
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
};
</script>
