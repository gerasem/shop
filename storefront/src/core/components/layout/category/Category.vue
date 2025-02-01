<script setup lang="ts">

import CategoryItem from '@/core/components/layout/category/CategoryItem.vue'
</script>

<template>
  <div class="container is-fluid ">
    <CategoryItem v-for="category in 5" :key="category" />
  </div>
</template>

<style scoped lang="scss">

</style>
