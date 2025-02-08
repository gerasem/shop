<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
import { useMeta } from '@/composables/useMeta.ts'
import Item from '@/components/item/Item.vue'

useMeta('catalog')
</script>

<template>
  <InformationBanner />

  <Navbar />

  <div class="container is-fluid">
    <div class="title__container">
      <h2 class="title is-2">Categories</h2>

      <div class="select">
        <select>
          <option>Select dropdown</option>
          <option>With options</option>
        </select>
      </div>
    </div>

    <div class="columns is-mobile is-multiline is-3">
      <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop" v-for="item in 40" :key="item">
        <Item />
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped lang="scss">

</style>
