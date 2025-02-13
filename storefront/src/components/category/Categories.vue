<script setup lang="ts">
import CategoryCard from '@/components/category/CategoryCard.vue'
import CategoryPreview from '@/components/category/CategoryPreview.vue'
import CategoriesNarrow from '@/components/category/CategoryTitleMobile.vue'
import { useDevice } from '@/composables/useDevice.ts'
import CategoryPreviewMobile from '@/components/category/CategoryPreviewMobile.vue'

const { isMobile } = useDevice()
</script>

<template>
  <template v-if="isMobile">
    <CategoriesNarrow />

    <div class="container is-fluid">
      <CategoryPreviewMobile v-for="categoryPreview in 4" :key="categoryPreview" />
    </div>
  </template>

  <template v-else>
    <div class="container is-fluid">
      <div class="columns is-5-tablet is-6-desktop is-8-fullhd">
        <div class="column is-one-third-tablet is-one-fifth-desktop">
          <CategoryCard v-for="category in 5" :key="category" />
        </div>

        <div class="column">
          <CategoryPreview v-for="categoryPreview in 4" :key="categoryPreview" />
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">

</style>
