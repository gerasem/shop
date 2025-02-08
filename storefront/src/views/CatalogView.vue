<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import Hero from '@/components/content/Hero.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
import { useHead } from 'unhead'

useHead({
  title: 'Catalog',
  meta: [
    {
      name: 'description',
      content: 'description'
    },
  ],
})
</script>

<template>
  <InformationBanner />

  <Navbar />

  <Hero title="Catalog" />

  <section class="section">
    <div class="container is-fluid">
      Catalog
    </div>
  </section>

  <Footer />
</template>

<style scoped lang="scss">

</style>
