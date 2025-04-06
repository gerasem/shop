<script setup lang="ts">
import Hero from '@/components/content/Hero.vue'
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSeoMeta } from '@unhead/vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories()
})

useSeoMeta({
  title: "404 Error",
})
</script>

<template>
  <Hero
    title="404"
    subtitle="Page not found"
  />

  <section class="section">
    <div class="container is-fluid">404</div>
  </section>
</template>
