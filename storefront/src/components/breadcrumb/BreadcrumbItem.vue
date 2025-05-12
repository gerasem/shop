<script setup lang="ts">
import { useCategoryStore } from '@/stores/CategoryStore'
import { localePath } from '@/composables/localePath'

const categoryStore = useCategoryStore()
defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <nav
    class="breadcrumb"
    aria-label="breadcrumbs"
  >
    <ul>
      <template v-if="loading">
        <li class="breadcrumb__skeleton">
          <span class="is-skeleton">Loading...</span>
        </li>
        <li class="breadcrumb__skeleton">
          <span class="is-skeleton">Loading...</span>
        </li>
      </template>
      <template v-else>
        <li>
          <RouterLink :to="localePath('/')">Home</RouterLink>
        </li>
        <li v-if="categoryStore.currentCategory">
          <RouterLink :to="localePath(`category/${categoryStore.currentCategory.handle}`)">
            {{ categoryStore.currentCategory.name }}
          </RouterLink>
        </li>
      </template>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@forward 'bulma/sass/components/breadcrumb';

.breadcrumb__skeleton {
  gap: 10px;
  padding-right: 10px;
}
</style>
