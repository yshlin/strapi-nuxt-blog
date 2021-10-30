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
        <div
          v-if="infiniteScroll"
          class="d-flex align-center text-center justify-center"
        >
          <v-progress-circular
            v-intersect="onIntersect"
            :style="`transition: opacity 1s ease-in-out; opacity: ${
              isIntersecting ? '1' : '0'
            }`"
            indeterminate
            size="48"
          />
        </div>
        <v-btn
          block
          x-large
          :to="
            localePath({
              name: 'categories-slug-page',
              params: { slug: category.name, page: page + 1 },
            })
          "
          :style="infiniteScroll ? 'opacity: 0; pointer-events: none' : ''"
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
  async asyncData({ $strapi, i18n, store, env, params }) {
    const pageSize = env.pageSize;
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
      infiniteScroll: env.enableInfiniteScroll,
      isIntersecting: false,
      loadedPage: page,
      pageSize,
      page,
      pagePostfix,
      category: currentCategory,
      articles: await $strapi.find("articles", {
        "category.name": params.slug,
        _sort: "published_at:DESC",
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
  methods: {
    async onIntersect(entries) {
      this.isIntersecting = entries[0].isIntersecting;
      if (this.isIntersecting) {
        const loadedArticles = await this.loadArticles(++this.loadedPage);
        for (const loadedArticle of loadedArticles) {
          this.articles.push(loadedArticle);
        }
        this.isIntersecting = false;
      }
    },
    async loadArticles(nextPage) {
      return await this.$strapi.find("articles", {
        "category.name": this.category.name,
        _sort: "published_at:DESC",
        _locale: strapiLocale(this.$i18n.locale),
        _start: (nextPage - 1) * this.pageSize,
        _limit: this.pageSize,
      });
    },
  },
};
</script>
