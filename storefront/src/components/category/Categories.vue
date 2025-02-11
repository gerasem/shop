<script setup lang="ts">
import CategoryCard from '@/components/category/CategoryCard.vue'
import CategoryPreview from '@/components/category/CategoryPreview.vue'
</script>

<template>
  <div class="container is-fluid">
    <div class="columns is-5-tablet is-6-desktop is-8-fullhd">
      <div class="column is-full is-one-third-tablet is-one-fifth-desktop category__container">
        <div class="is-hidden-mobile category__sticky-header"></div>
        <CategoryCard v-for="category in 5" :key="category" />
      </div>

      <div class="column">
        <CategoryPreview v-for="categoryPreview in 4" :key="categoryPreview" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category {
  &__container {
    @media (max-width: $screen-md-max) {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;
      background: $color-categories-background;
      gap: 15px;
    }
  }

  &__sticky-header {
    /*background: #ffffff;
    z-index: 5;
    width: 100%;
    height: 20px;
    top: 56px;
    position: sticky;
    margin-top: -20px;*/
  }
}
</style>
