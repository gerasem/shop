<script setup lang="ts">
import CategoryImage from "@/components/category/CategoryImage.vue";
import CategoryTitle from "@/components/category/CategoryTitle.vue";
import type { ICategory } from "@/interfaces/ICategory.ts";

defineProps<{
  category: ICategory;
}>();
</script>

<template>
  <CategoryImage :category="category" />

  <CategoryTitle :category="category" />
</template>

<style scoped lang="scss"></style>
