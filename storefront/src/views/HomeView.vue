<script setup lang="ts">
import Navbar from '@/components/layout/navbar/Navbar.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import Categories from '@/components/layout/category/Categories.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
</script>

<template>
  <InformationBanner />

  <Navbar />

  <Categories />

  <section class="section">
    <div class="container is-fluid">
      Home
    </div>
  </section>

  <Footer />
</template>
