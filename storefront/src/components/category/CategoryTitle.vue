<script setup lang="ts">

import { localePath } from '@/composables/localePath.ts'
</script>

<template>
  <RouterLink :to="localePath('catalog')" class="category__title">
    <h3>test Test 123</h3>
  </RouterLink>
</template>

<style scoped lang="scss">
.category {
  &__title {
    position: sticky;
    z-index: 1;
    display: block;
    color: $color-text;
    /*background: #fff;*/
    padding-bottom: 10px;

    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        top: calc(40px + (#{$i} - 1) * 15px);
      }
    }

    @media (max-width: $screen-md-max) {
      position: static;
      background: none;
      padding-bottom: 0;
      gap: 15px;
    }
  }
}
</style>
