<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import CategoriesNarrow from '@/components/category/CategoryTitleNarrow.vue'
import Title from '@/components/content/Title.vue'

useSeoMeta({
  title: 'Contact',
})
</script>

<template>
  <CategoriesNarrow />

  <div class="container is-fluid">
    <Title>Contact</Title>
  </div>
</template>

<style scoped lang="scss"></style>
