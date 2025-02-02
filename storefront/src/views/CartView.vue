<script setup lang="ts">
import Footer from '@/components/layout/footer/Footer.vue'
import Hero from '@/components/layout/content/Hero.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
import Navbar from '@/components/layout/navbar/Navbar.vue'
</script>

<template>
  <InformationBanner />

  <Navbar />

  <Hero title="Catalog" />

  <section class="section">
    <div class="container is-fluid">
      Shopping Cart
    </div>
  </section>

  <Footer />
</template>

<style scoped lang="scss">

</style>
