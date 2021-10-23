<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" lg="6" md="8" sm="10" xs="12">
        <h1>分類：{{ category.name }}</h1>
      </v-col>
    </v-row>
    <v-row
      v-for="article in articles"
      :key="article.id"
      justify="center"
      no-gutters
    >
      <v-col cols="12" xl="6" lg="8" sm="10" xs="12">
        <ArticleCard :article="article" :full="full" />
        <v-divider />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleCard from "../../components/ArticleCard";
import { getMetaTags } from "../../utils/seo";
import { getStrapiMedia } from "../../utils/medias";

export default {
  components: {
    ArticleCard,
  },
  async asyncData({ $strapi, params }) {
    const matchingCategories = await $strapi.find("categories", {
      name: params.slug,
    });
    return {
      category: matchingCategories[0],
      articles: await $strapi.find("articles", {
        "category.name": params.slug,
      }),
      global: await $strapi.find("global"),
    };
  },
  head() {
    const { defaultSeo, favicon, siteName } = this.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      metaTitle: `${this.category.name} articles`,
      metaDescription: `All articles about ${this.category.name}`,
    };

    return {
      title: fullSeo.metaTitle,
      titleTemplate: `%s | ${siteName}`,
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: "favicon",
          href: getStrapiMedia(favicon.url),
        },
      ],
    };
  },
};
</script>
