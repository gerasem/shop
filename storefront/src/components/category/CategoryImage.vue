<script setup lang="ts">
import { localePath } from "@/composables/localePath.ts";
import type { ICategory } from "@/interfaces/ICategory.ts";

defineProps<{
  category: ICategory;
}>();
</script>

<template>
  <RouterLink :to="localePath(`category/${category.slug}`)" class="is-hidden-mobile">
    <img class="image is-16by9 category__image" :src="category.image" :alt="category.title" />
  </RouterLink>
</template>

<style scoped lang="scss">
.category {
  &__image {
    width: 100%;
    object-fit: cover;
  }
}
</style>
