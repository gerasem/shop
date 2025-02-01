<script setup lang="ts">
import Header from '@/components/layout/header/Header.vue'
import Footer from '@/components/layout/footer/Footer.vue'
import Category from '@/components/layout/category/Category.vue'
import CategoryPreview from '@/components/layout/category/CategoryPreview.vue'
</script>

<template>
  <Header />

  <div class="container is-fluid ">
    <div class="columns">
      <div class="column is-one-fifth">
        <Category />
      </div>

      <div class="column">
        <CategoryPreview />
      </div>
    </div>

  </div>

  <section class="section">
    <div class="container is-fluid">
      Home
    </div>
  </section>

  <Footer />
</template>
