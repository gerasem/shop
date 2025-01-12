<script setup lang="ts">
import BaseIcon from '@/core/components/common/BaseIcon.vue'
import { localePath } from '@/core/composables/localePath.ts'

const icons = [
  { icon: 'bag', link: 'cart' },
]
</script>

<template>
  <RouterLink v-for="icon in icons"
              :key="icon.link"
              class="header__icon-link"
              :to="localePath(icon.link)">
    <BaseIcon :icon="icon.icon" :width="24" :height="24" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.header{
  &__icon-link {
    width: 24px;
    text-align: center;
  }
}
</style>
