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
import moment from "moment";
import { getStrapiMedia } from "../../utils/medias";
import { getMetaTags } from "../../utils/seo";
import ArticleCard from "../../components/ArticleCard";

export default {
  components: {
    ArticleCard,
  },
  async asyncData({ $strapi, params }) {
    const matchingArticles = await $strapi.find("articles", {
      title: params.slug,
    });
    return {
      article: matchingArticles[0],
      global: await $strapi.find("global"),
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
          rel: "favicon",
          href: getStrapiMedia(favicon.url),
        },
      ],
    };
  },
  methods: {
    moment,
    getStrapiMedia,
  },
};
</script>
