<script setup lang="ts">
import CategoryCard from '@/components/layout/category/CategoryCard.vue'
import CategoryPreview from '@/components/layout/category/CategoryPreview.vue'
</script>

<template>
  <div class="container is-fluid ">
    <div class="columns is-5-tablet is-8-desktop">
      <div class="is-hidden-mobile column is-one-third-tablet is-one-fifth-desktop">
        <div class="category__sticky-header"></div>
        <CategoryCard v-for="category in 5" :key="category" />
      </div>

      <div class="column">
        <CategoryPreview v-for="categoryPreview in 4" :key="categoryPreview"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category__sticky-header {
  background: #ffffff;
  z-index: 5;
  width: 100%;
  height: 20px;
  top: 56px;
  position: sticky;
  margin-top: -20px;
}
</style>
