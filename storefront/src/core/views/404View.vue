<script setup lang="ts">
import HeaderContainer from "@/core/components/layout/header/Header.vue";
import FooterContainer from '@/core/components/layout/footer/Footer.vue'
import HeroContainer from '@/core/components/layout/content/Hero.vue'
</script>

<template>
  <HeaderContainer />
  <HeroContainer title="404" subtitle="Page not found"/>
  <section class="section">
    <div class="container is-fluid">
      404
    </div>
  </section>
  <FooterContainer />
</template>
