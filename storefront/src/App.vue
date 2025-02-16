<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loader from '@/components/common/Loader.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import Footer from '@/components/footer/Footer.vue'
</script>

<template>
  <Loader />
  <InformationBanner />
  <Navbar />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
