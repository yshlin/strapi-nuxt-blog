<template>
  <v-app>
    <v-app-bar dense fixed clipped-left app>
      <v-layout row>
        <v-tabs v-model="current_page" tile color="grey darken-3" group>
          <v-tabs-slider color="grey-darken-3" />
          <v-tab>
            <nuxt-link to="/" tag="a" class="text-decoration-none">
              <Logo />
            </nuxt-link>
          </v-tab>
          <v-tab
            value="about"
            :to="{
              name: 'articles-slug',
              params: { slug: '關於 eddie-lin.me - 工程師的奇幻漂流 🤓⛵🌈' },
            }"
            class="grey--text text--darken-3 font-weight-bold"
          >
            關於
          </v-tab>
          <v-tab
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            :to="{
              name: 'categories-slug',
              params: { slug: category.name },
            }"
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
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Eddie Lin</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Logo from "../components/Logo";
export default {
  components: { Logo },
  data: function () {
    return {
      categories: [],
      current_page: "home",
    };
  },
  async fetch() {
    this.categories = await this.$strapi.find("categories");
  },
};
</script>
<style>
.v-slide-group__prev.v-slide-group__prev--disabled,
.v-slide-group__next.v-slide-group__next--disabled {
  display: none !important;
}
</style>
