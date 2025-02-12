<script setup lang="ts">

import { localePath } from '@/composables/localePath.ts'
</script>

<template>
  <RouterLink :to="localePath('catalog')" class="is-hidden-mobile">
    <img class="image is-16by9 category__image" src="https://placehold.co/400x200" alt="category">
  </RouterLink>
</template>

<style scoped lang="scss">
.category {
  &__image {
    width: 100%;
    object-fit: cover;
  }
}
</style>
