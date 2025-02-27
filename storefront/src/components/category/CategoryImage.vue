<script setup lang="ts">
import { localePath } from '@/composables/localePath.ts'
import { HttpTypes } from "@medusajs/types"

defineProps<{
  category: HttpTypes.StoreProductCategory
}>()
</script>

<template>
  <RouterLink
    :to="localePath(`category/${category.handle}`)"
    class="is-hidden-mobile"
  >
    <img
      class="image is-16by9 category__image"
      :src="category.image"
      :alt="category.name"
    />
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
