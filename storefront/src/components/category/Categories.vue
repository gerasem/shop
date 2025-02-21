<script setup lang="ts">
  import CategoryCard from '@/components/category/CategoryCard.vue'
  import CategoryPreview from '@/components/category/CategoryPreview.vue'
  import CategoryTitleNarrow from '@/components/category/CategoryTitleNarrow.vue'
  import { useDevice } from '@/composables/useDevice.ts'
  import CategoryPreviewMobile from '@/components/category/CategoryPreviewMobile.vue'
  import { useCategoryStore } from '@/stores/CategoryStore'
  import { useLoader } from '@/composables/useLoader'
  import CategoryCardSkeleton from '@/components/category/CategoryCardSkeleton.vue'

  const { isMobile } = useDevice()
  const { loading } = useLoader()
  const categoryStore = useCategoryStore()
</script>

<template>
  <template v-if="isMobile">
    <CategoryTitleNarrow />

    <div class="container is-fluid">
      <CategoryPreviewMobile v-for="category in categoryStore.categories" :key="category.id" :category="category" />
    </div>
  </template>

  <template v-else>
    <div class="container is-fluid">
      <div class="columns is-5-tablet is-6-desktop is-8-fullhd">
        <div class="column is-one-third-tablet is-one-fifth-desktop">
          <template v-if="categoryStore.categories.length === 0">
            <CategoryCardSkeleton v-for="skeleton in 5" :key="skeleton" />
          </template>

          <template v-else>
            <CategoryCard v-for="category in categoryStore.categories" :key="category.id" :category="category" />
          </template>
        </div>

        <div class="column">
          <CategoryPreview v-for="category in categoryStore.categories" :key="category.id" :category="category" />
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">
  .category {
    &__preview-container {
      margin-bottom: 2rem;
    }
  }
</style>
