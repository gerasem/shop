<script setup lang="ts">
import CategoryCard from '@/components/category/CategoryCard.vue'
import CategoryPreview from '@/components/category/CategoryPreview.vue'
import CategoryTitleMobile from '@/components/category/CategoryTitleMobile.vue'
import { useDevice } from '@/composables/useDevice.ts'
import CategoryPreviewMobile from '@/components/category/CategoryPreviewMobile.vue'
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
import CategoryTitle from '@/components/category/CategoryTitle.vue'

const { isMobile } = useDevice()

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})
</script>

<template>
  <template v-if="isMobile">
    <CategoryTitleMobile />

    <div class="container is-fluid">
      <CategoryPreviewMobile v-for="category in categoryStore.categories" :key="category.id" :category="category" />
    </div>
  </template>

  <template v-else>
    <div class="container is-fluid">
      <div class="columns is-5-tablet is-6-desktop is-8-fullhd">
        <div class="column is-one-third-tablet is-one-fifth-desktop">
          <CategoryCard v-for="category in categoryStore.categories" :key="category.id" :category="category" />
        </div>

        <div class="column">
          <CategoryPreview v-for="category in categoryStore.categories" :key="category.id" :category="category" />
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">

</style>
