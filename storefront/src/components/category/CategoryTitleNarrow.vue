<script setup lang="ts">
import CategoryTitle from '@/components/category/CategoryTitle.vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
</script>

<template>
  <div class="is-full category__container">
    <CategoryTitle
      v-for="category in categoryStore.categories"
      :key="category.id"
      :category="category"
    />
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
  }

  &__title {
    padding-bottom: 0;
  }
}
</style>
