<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import CategoryTitleNarrow from '@/components/category/CategoryTitleNarrow.vue'
import Title from '@/components/content/Title.vue'

useSeoMeta({
  title: '404 Error',
})
</script>

<template>
  <CategoryTitleNarrow />

  <div class="container is-fluid">
    <Title>Error 404: Nothing found</Title>

    <p>Nothing found</p>
  </div>
</template>
