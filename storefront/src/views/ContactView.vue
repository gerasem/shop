<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/CatalogStore'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})
</script>

<template></template>

<style scoped lang="scss"></style>
