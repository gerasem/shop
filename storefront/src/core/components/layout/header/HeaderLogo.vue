<script setup lang="ts">
import { localePath } from '@/core/composables/localePath.ts'
import BaseImage from '@/core/components/common/BaseImage.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <RouterLink class="navbar-item is-flex is-flex-grow-1 header__logo" :to="localePath('')">
    <BaseImage src="logo.svg" />
  </RouterLink>

  <div class="navbar-item is-hidden-touch header__slogan">{{t("Demo project of an online store")}}</div>
</template>

<style scoped lang="scss">
.header {
  &__logo {
    margin-top: -5px;

    @media (max-width: $screen-md-max) {
      flex: 1;
      justify-content: center;
    }
  }

  &__slogan {
    color: $text-muted;

  }
}
</style>
