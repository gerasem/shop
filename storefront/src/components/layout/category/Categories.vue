<script setup lang="ts">
import CategoryCard from '@/components/layout/category/CategoryCard.vue'
import CategoryPreview from '@/components/layout/category/CategoryPreview.vue'
</script>

<template>
  <div class="container is-fluid ">
    <div class="columns is-5-tablet is-8-desktop">
      <div class="is-hidden-mobile column is-one-third-tablet is-one-fifth-desktop">
        <CategoryCard v-for="category in 5" :key="category" />
      </div>

      <div class="column">
        <CategoryPreview v-for="categoryPreview in 4" :key="categoryPreview"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
