<template>
  <v-app>
    <v-app-bar dense fixed clipped-left app>
      <v-layout row>
        <v-tabs v-model="current_page" tile color="grey darken-3" group>
          <v-tabs-slider color="grey-darken-3" />
          <v-tab>
            <nuxt-link
              :to="localePath('/')"
              tag="a"
              class="text-decoration-none"
            >
              <Logo />
            </nuxt-link>
          </v-tab>
          <v-tab
            value="about"
            :to="
              localePath({
                name: 'articles-slug',
                params: { slug: $t('about.slug') },
              })
            "
            class="grey--text text--darken-3 font-weight-bold"
          >
            {{ $t("about") }}
          </v-tab>
          <v-tab
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            :to="
              localePath({
                name: 'categories-slug',
                params: { slug: category.name },
              })
            "
            class="grey--text text--darken-3 font-weight-bold"
          >
            {{ category.name }}
          </v-tab>
        </v-tabs>
      </v-layout>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer>
      <v-container>
        <v-row align="center">
          <v-col class="text-center">
            <span class="d-inline-block">{{ $t("switch.lang:") }}</span>
            <nuxt-link
              v-if="$i18n.locale !== 'en' && ('en' in i18nRoute || isIndex)"
              class="d-inline-block"
              :to="switchLocalePath('en')"
            >
              English
            </nuxt-link>
            <span
              v-else
              :class="{
                'grey--text': $i18n.locale !== 'en' && !('en' in i18nRoute),
              }"
              class="d-inline-block"
              >English</span
            >
            |
            <nuxt-link
              v-if="
                $i18n.locale !== 'zh-TW' && ('zh-TW' in i18nRoute || isIndex)
              "
              class="d-inline-block"
              :to="switchLocalePath('zh-TW')"
            >
              正體中文
            </nuxt-link>
            <span
              v-else
              :class="{
                'grey--text':
                  $i18n.locale !== 'zh-TW' && !('zh-TW' in i18nRoute),
              }"
              class="d-inline-block"
            >
              正體中文
            </span>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col class="text-center">
            <span class="d-inline-block">
              {{ new Date().getFullYear() }} — <strong>Eddie Lin</strong>
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import Logo from "../components/Logo";
import { strapiLocale } from "../utils/locale";

export default {
  components: { Logo },
  data: function () {
    return {
      categories: [],
      current_page: "home",
    };
  },
  async fetch() {
    await this.loadCategories();
  },
  computed: {
    i18nRoute() {
      return this.$store.state.i18n.routeParams;
    },
    isIndex() {
      return this.$route.name.startsWith("index___");
    },
  },
  watch: {
    "$i18n.locale": function () {
      this.loadCategories();
    },
  },
  methods: {
    async loadCategories() {
      this.categories = await this.$strapi.find("categories", {
        _locale: strapiLocale(this.$i18n),
      });
    },
  },
};
</script>
<style>
.v-slide-group__prev.v-slide-group__prev--disabled,
.v-slide-group__next.v-slide-group__next--disabled {
  display: none !important;
}
</style>
