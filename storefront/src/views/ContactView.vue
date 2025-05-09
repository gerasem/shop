<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import CategoryTitleNarrow from '@/components/category/CategoryTitleNarrow.vue'
import Title from '@/components/content/Title.vue'

useSeoMeta({
  title: 'Contact',
})
</script>

<template>
  <CategoryTitleNarrow />

  <div class="container is-fluid">
    <Title>Contact</Title>
  </div>
</template>

<style scoped lang="scss"></style>
