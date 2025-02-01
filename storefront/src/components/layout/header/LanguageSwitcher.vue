<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const supportedLocales: String[] = [
  'de',
  'en'
]
</script>

<template>
  <div
    class="header__languages"
    :aria-label="t('Select Language')"
  >
    <template v-for="(lang, index) of supportedLocales" :key="lang">
      <a
        :class="{ 'header__language--current': locale === lang }"
        class="header__language is-clickable"
        :href="locale !== lang ? `/${lang}` : '#'"
      >{{ lang }}</a
      >

      <span
        v-if="index !== supportedLocales.length - 1"
        class="header__language-separator"
      >/</span
      >
    </template>
  </div>
</template>

<style scoped lang="scss">
.header {
  &__languages {
    user-select: none;
  }

  &__language-separator {
    color: #ebebeb;
    margin: 0 5px;
    user-select: none;
    cursor: default;
  }

  &__language {
    color: $color-icons;
    display: inline-block;

    &:first-letter {
      text-transform: uppercase;
    }

    &--current {
      color: $color-light-gray;
      cursor: not-allowed;

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }
  }
}
</style>
