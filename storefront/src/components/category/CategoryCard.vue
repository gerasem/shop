<script setup lang="ts">
import CategoryImage from '@/components/category/CategoryImage.vue'
import CategoryTitle from '@/components/category/CategoryTitle.vue'
import { HttpTypes } from "@medusajs/types"

defineProps<{
  category: HttpTypes.StoreProductCategory
}>()
</script>

<template>
  <CategoryImage :category="category" />

  <CategoryTitle :category="category" />
</template>

<style scoped lang="scss"></style>
