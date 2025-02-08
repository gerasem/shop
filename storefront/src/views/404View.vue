<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
import Footer from '@/components/footer/Footer.vue'
import Hero from '@/components/content/Hero.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
import { useMeta } from '@/composables/useMeta.ts'

useMeta("404")
</script>

<template>
  <InformationBanner />

  <Navbar />

  <Hero title="404" subtitle="Page not found"/>

  <section class="section">
    <div class="container is-fluid">
      404
    </div>
  </section>

  <Footer />
</template>
