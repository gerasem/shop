<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSeoMeta } from '@unhead/vue'
import CategoriesNarrow from '@/components/category/CategoryTitleNarrow.vue'
import Title from '@/components/content/Title.vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

useSeoMeta({
  title: 'Contact',
})
</script>

<template>
  <CategoriesNarrow />

  <div class="container is-fluid">
    <Title>Contact</Title>
  </div>
</template>

<style scoped lang="scss"></style>
