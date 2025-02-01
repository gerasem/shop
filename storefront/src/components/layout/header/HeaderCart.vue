<script setup lang="ts">
import BaseIcon from '@/components/common/BaseIcon.vue'
import { localePath } from '@/composables/localePath.ts'
</script>

<template>
  <RouterLink class="header__icon-link"
              :to="localePath('cart')">
    <BaseIcon icon="bag" :width="24" :height="24" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.header{
  &__icon-link {
    width: 24px;
    text-align: center;
    color: $color-icons;
  }
}
</style>
