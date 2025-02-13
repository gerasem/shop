<script setup lang="ts">
import CategoryTitle from '@/components/category/CategoryTitle.vue'
</script>

<template>
  <div class="is-full category__container">
    <CategoryTitle v-for="category in 5" :key="category" />
  </div>
</template>

<style scoped lang="scss">
.category {
  &__container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    background: $color-categories-background;
    gap: 15px;
    padding: .75rem;
    margin-bottom: 2rem;
  }

  &__title{
    padding-bottom: 0;
  }
}
</style>
