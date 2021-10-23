<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" xl="6" lg="8" sm="10" xs="12">
        <h1>{{ homepage.hero.title }}</h1>
      </v-col>
    </v-row>
    <v-row
      v-for="article in articles"
      :key="article.id"
      justify="center"
      no-gutters
    >
      <v-col cols="12" xl="6" lg="8" sm="10" xs="12">
        <ArticleCard :article="article" />
        <v-divider />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getMetaTags } from "../utils/seo";
import { getStrapiMedia } from "../utils/medias";
import ArticleCard from "../components/ArticleCard";

export default {
  components: {
    ArticleCard,
  },
  async asyncData({ $strapi }) {
    return {
      articles: await $strapi.find("articles"),
      homepage: await $strapi.find("homepage"),
      global: await $strapi.find("global"),
    };
  },
  head() {
    const { seo } = this.homepage;
    const { defaultSeo, favicon, siteName } = this.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      ...seo,
    };

    return {
      titleTemplate: `%s | ${siteName}`,
      title: fullSeo.metaTitle,
      meta: getMetaTags(fullSeo),
      link: [
        {
          // rel: "favicon",
          rel: "icon",
          type: "image/png",
          href: getStrapiMedia(favicon.url),
        },
      ],
    };
  },
};
</script>
