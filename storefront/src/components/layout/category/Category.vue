<script setup lang="ts">

import CategoryCard from '@/components/layout/category/CategoryCard.vue'
</script>

<template>
  <CategoryCard v-for="category in 5" :key="category" />
</template>

<style scoped lang="scss">

</style>
