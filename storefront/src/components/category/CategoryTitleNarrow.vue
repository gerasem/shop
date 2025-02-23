<script setup lang="ts">
import CategoryTitle from '@/components/category/CategoryTitle.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useLoader } from '@/composables/useLoader'

const categoryStore = useCategoryStore()
const { loading } = useLoader()
</script>

<template>
  <div class="is-full category__container">
    <template v-if="categoryStore.categories.length === 0">
      <div
        v-for="skeleton in 5"
        :key="skeleton"
        class="skeleton-lines"
      >
        <div></div>
      </div>
    </template>

    <template v-else>
      <CategoryTitle
        v-for="category in categoryStore.categories"
        :key="category.id"
        :category="category"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.category {
  &__container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    background: $color-categories-background;
    gap: 15px;
    padding: 0.75rem;
    margin-bottom: 2rem;
    min-height: 50px;
    align-items: center;
  }

  &__title {
    padding-bottom: 0;
    padding-top: 0;
  }
}
</style>
