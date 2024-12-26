<script setup lang="ts">
import HeaderContainer from "@/core/components/layout/header/Header.vue";
import FooterContainer from '@/core/components/layout/footer/Footer.vue'
import HeroContainer from '@/core/components/layout/content/Hero.vue'
</script>

<template>
  <HeaderContainer />
  <HeroContainer />
  <section class="section">
    <div class="container is-fluid">
      This container is <strong>fluid</strong>: it will have a 32px gap on either
      side, on any viewport size.
    </div>
  </section>
  <FooterContainer />
</template>
