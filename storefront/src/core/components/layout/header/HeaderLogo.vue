<script setup lang="ts">
import { localePath } from '@/core/composables/localePath.ts'
import BaseImage from '@/core/components/common/BaseImage.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <RouterLink class="navbar-item header__logo" :to="localePath('')">
    <BaseImage src="logo.svg" />
  </RouterLink>

  <div class="navbar-item is-hidden-touch header__slogan">{{t("Demo project of an online store")}}</div>
</template>

<style scoped lang="scss">
.header {
  &__logo {
    margin-top: -5px;
  }

  &__slogan {
    color: $text-muted;

  }
}
</style>
