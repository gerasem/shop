<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import CategoryTitleNarrow from '@/components/category/CategoryTitleNarrow.vue'
import Header from '@/components/content/Header.vue'

useSeoMeta({
  title: '404 Error',
})
</script>

<template>
  <CategoryTitleNarrow />

  <main class="container is-fluid">
    <Header :level="1">Error 404: Nothing found</Header>

    <p>Nothing found</p>
  </main>
</template>
