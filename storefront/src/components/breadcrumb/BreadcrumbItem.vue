<script setup lang="ts">
import { useCategoryStore } from '@/stores/CategoryStore'
import { localePath } from '@/composables/localePath'

const categoryStore = useCategoryStore()
</script>

<template>
  <nav
    class="breadcrumb"
    aria-label="breadcrumbs"
  >
    <ul>
      <li>
        <RouterLink :to="localePath('/')">Home</RouterLink>
      </li>
      <li v-if="categoryStore.currentCategory">
        <RouterLink :to="localePath(`category/${categoryStore.currentCategory.handle}`)">
          {{ categoryStore.currentCategory.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@forward 'bulma/sass/components/breadcrumb';
</style>
