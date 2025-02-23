<script setup lang="ts">
import Hero from '@/components/content/Hero.vue'
import { useMeta } from '@/composables/useMeta.ts'

useMeta('404')
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
