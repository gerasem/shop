<script setup lang="ts">
import { useMeta } from '@/composables/useMeta.ts'
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

useMeta('Contact')
</script>

<template>Contact Page</template>

<style scoped lang="scss"></style>
