<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue'
import Gallery from '@/components/gallery/Gallery.vue'
</script>

<template>
  <InformationBanner />

  <Navbar />

  <div class="container is-fluid">
    <Breadcrumb />

    <div class="columns is-mobile is-3">
      <div class="column is-half">
        <Gallery />
      </div>

      <div class="column is-half">
        <div class="title__container">
          <h1 class="title is-2">Item</h1>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped lang="scss">

</style>
