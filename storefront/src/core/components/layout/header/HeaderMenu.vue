<script setup lang="ts">
import { localePath } from '@/core/composables/localePath.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const links = [
  { path: '', text: 'Home' },
  { path: 'catalog', text: 'Catalog' },
  { path: 'cart', text: 'Cart' }
]
</script>

<template>
  <RouterLink v-for="link in links"
              :key="link.path"
              class="navbar-item"
              :to="localePath(link.path)">
    {{ t(link.text) }}
  </RouterLink>
</template>

<style scoped lang="scss">

</style>
