<script setup lang="ts">
import { localePath } from '@/core/composables/localePath.ts'
import BaseImage from '@/core/components/common/BaseImage.vue'
</script>

<template>
  <RouterLink class="navbar-item header__logo" :to="localePath('')">
    <BaseImage src="logo.svg" />
  </RouterLink>
</template>

<style scoped lang="scss">
.header {
  &__logo {
    margin-top: -5px;
  }
}
</style>
