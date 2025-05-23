<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import CategoryTitleNarrow from '@/components/category/CategoryTitleNarrow.vue'
import Header from '@/components/content/Header.vue'

useSeoMeta({
  title: 'Contact',
})
</script>

<template>
  <CategoryTitleNarrow />

  <main class="container is-fluid">
    <Header :level="1">Contact</Header>
  </main>
</template>

<style scoped lang="scss"></style>
