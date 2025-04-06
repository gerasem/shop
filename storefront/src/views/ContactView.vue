<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSeoMeta } from '@unhead/vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

useSeoMeta({
  title: 'Contact',
})
</script>

<template>Contact Page</template>

<style scoped lang="scss"></style>
