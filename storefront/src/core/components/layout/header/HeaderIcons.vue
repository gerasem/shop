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
              :to="localePath(icon.link)">
    <BaseIcon :icon="icon.icon" />
  </RouterLink>
</template>

<style lang="scss" scoped>

</style>
