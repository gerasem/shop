<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loader from '@/components/loader/Loader.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import Footer from '@/components/footer/Footer.vue'
import Toast from '@/components/toast/Toast.vue'
</script>

<template>
  <Loader />
  <InformationBanner />
  <Navbar />
  <div id="content">
    <RouterView />
  </div>
  <Footer />
  <Toast />
</template>

<style scoped></style>
