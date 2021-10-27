<template>
  <v-container>
    <v-row justify="center" no-gutters>
      <v-col cols="12" lg="6" md="8" sm="10" xs="12">
        <h1>{{ $t("category:") }}{{ category.name }}{{ pagePostfix }}</h1>
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
    <v-row v-if="articles.length >= pageSize">
      <v-col>
        <v-btn
          block
          x-large
          :to="
            localePath({
              name: 'categories-slug-page',
              params: { slug: category.name, page: page + 1 },
            })
          "
        >
          {{ $t("next.page") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleCard from "./ArticleCard";
import { getMetaTags } from "../utils/seo";
import { getStrapiMedia } from "../utils/medias";
import { strapiLocale, vueLocale } from "../utils/locale";

export default {
  components: {
    ArticleCard,
  },
  async asyncData({ $strapi, i18n, store, params }) {
    const pageSize = store.state.pageSize;
    const page = parseInt(params.page) || 1;
    const pagePostfix =
      page > 1 ? ` (${i18n.t("page.n", { page: page })})` : "";
    const matchingCategories = await $strapi.find("categories", {
      name: params.slug,
      _locale: strapiLocale(i18n.locale),
    });
    const currentCategory = matchingCategories[0];
    let categoryRoute = {};
    for (const localization of currentCategory.localizations) {
      const localeCategories = await $strapi.find("categories", {
        "localizations.id": currentCategory.id,
        _locale: localization.locale,
      });
      categoryRoute[vueLocale(localization.locale)] = {
        slug: localeCategories[0].name,
      };
    }
    await store.dispatch("i18n/setRouteParams", categoryRoute);
    return {
      pageSize,
      page,
      pagePostfix,
      category: currentCategory,
      articles: await $strapi.find("articles", {
        "category.name": params.slug,
        _locale: strapiLocale(i18n.locale),
        _start: (page - 1) * pageSize,
        _limit: pageSize,
      }),
      global: await $strapi.find("global", {
        _locale: strapiLocale(i18n.locale),
      }),
    };
  },
  head() {
    const { defaultSeo, favicon, siteName } = this.global;
    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      metaTitle:
        this.$t("category.title", { category: this.category.name }) +
        this.pagePostfix,
      metaDescription: this.$t("category.description", {
        category: this.category.name,
      }),
    };

    return {
      title: fullSeo.metaTitle,
      titleTemplate: `%s | ${siteName}`,
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
