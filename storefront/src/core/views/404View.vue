<script setup lang="ts">
import Header from "@/core/components/layout/header/Header.vue";
import Footer from '@/core/components/layout/footer/Footer.vue'
import Hero from '@/core/components/layout/content/Hero.vue'
</script>

<template>
  <Header />

  <Hero title="404" subtitle="Page not found"/>

  <section class="section">
    <div class="container is-fluid">
      404
    </div>
  </section>

  <Footer />
</template>
