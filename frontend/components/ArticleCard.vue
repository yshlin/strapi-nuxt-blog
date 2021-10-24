<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <nuxt-link
          :to="
            localePath({
              name: 'articles-slug',
              params: { slug: '關於 eddie-lin.me - 工程師的奇幻漂流 🤓⛵🌈' },
            })
          "
          class="d-inline-block text-decoration-none"
        >
          <v-avatar>
            <v-img
              :src="getStrapiMedia(article.author.picture.url)"
              :alt="article.author.name"
              class="d-inline-block"
            />
          </v-avatar>
          <span
            class="font-weight-bold d-inline-block grey--text text--darken-2"
            >{{ article.author.name }}</span
          >
        </nuxt-link>
        <span class="font-weight-thin d-inline-block grey--text">
          {{ $t("publish.at") }}
          <time v-if="article.published_at">
            {{ moment(article.published_at).startOf("day").fromNow() }}
          </time>
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <nuxt-link
          :key="article.id"
          :to="
            localePath({
              name: 'articles-slug',
              params: { slug: article.title },
            })
          "
          class="text-decoration-none"
        >
          <v-img
            :aspect-ratio="16 / 9"
            :src="getStrapiMedia(article.image.url)"
            class="white--text"
            style="position: relative"
          >
            <div class="ribbon ribbon-top-right">
              <span
                v-if="article.category"
                class="text-subtitle-1 font-weight-bold"
              >
                {{ article.category.name }}
              </span>
            </div>
            <div v-if="full">
              <h1 class="hero-heading my-2 mx-4">
                {{ article.title }}
              </h1>
            </div>
            <div v-else>
              <h2 class="hero-heading my-2 mx-4">
                {{ article.title }}
              </h2>
            </div>
          </v-img>
        </nuxt-link>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div v-if="full" class="text-body-1 mx-4">
          <TuiEditorViewer :initial-value="article.content"></TuiEditorViewer>
        </div>
        <div v-else class="text-body-1 mx-4">
          <div>{{ article.description }}</div>
          <br />
          <nuxt-link
            :to="
              localePath({
                name: 'articles-slug',
                params: { slug: article.title },
              })
            "
            class="text-decoration-none"
          >
            {{ $t("read.full", { count: getReadingTime(article.content) }) }}
          </nuxt-link>
          <br /><br />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getStrapiMedia } from "../utils/medias";
import moment from "moment";
import { getReadingTime } from "../utils/reading-time";

export default {
  props: {
    full: {
      type: Boolean,
      default: () => false,
    },
    article: {
      type: Object,
      default: () => ({}),
    },
  },
  beforeMount() {
    moment.locale(this.$i18n.locale);
  },
  beforeUpdate() {
    moment.locale(this.$i18n.locale);
  },
  methods: {
    moment,
    getStrapiMedia,
    getReadingTime,
  },
};
</script>
