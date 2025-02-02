<script setup lang="ts">
import Navbar from "@/components/layout/navbar/Navbar.vue";
import Footer from '@/components/layout/footer/Footer.vue'
import Hero from '@/components/layout/content/Hero.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
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
