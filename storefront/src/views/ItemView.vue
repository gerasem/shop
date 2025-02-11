<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
import { useMeta } from '@/composables/useMeta.ts'
import Item from '@/components/item/Item.vue'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb.vue'

useMeta('item')
</script>

<template>
  <InformationBanner />

  <Navbar />

  <div class="container is-fluid">
    <Breadcrumb />

    <div class="columns is-mobile is-3">
      <div class="column is-half">
        1
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
