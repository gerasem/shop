<script setup lang="ts">
import Header from '@/components/layout/header/Header.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import Categories from '@/components/layout/category/Categories.vue'
import CategoryPreview from '@/components/layout/category/CategoryPreview.vue'
</script>

<template>
  <Header />

  <Categories />

  <section class="section">
    <div class="container is-fluid">
      Home
    </div>
  </section>

  <Footer />
</template>
