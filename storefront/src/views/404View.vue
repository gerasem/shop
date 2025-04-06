<script setup lang="ts">
import Hero from '@/components/content/Hero.vue'
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSeoMeta } from '@unhead/vue'
import CategoriesNarrow from '@/components/category/CategoryTitleNarrow.vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

useSeoMeta({
  title: '404 Error',
})
</script>

<template>
  <CategoriesNarrow />

  <div class="container is-fluid">
    <div class="title__container">
      <h1 class="title is-2">Error 404</h1>
    </div>

    <p>Nothing found</p>
  </div>
</template>
