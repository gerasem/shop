<script setup lang="ts">
import HeaderButtons from '@/core/components/layout/header/HeaderButtons.vue'
import BaseImage from '@/core/components/common/BaseImage.vue'
import { localePath } from '@/core/composables/localePath.ts'
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item" :to="localePath('')">
        <BaseImage src="logo.svg" />
      </RouterLink>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" :to="localePath('')"> Home</RouterLink>
        <RouterLink class="navbar-item" :to="localePath('catalog')"> Catalog</RouterLink>
        <RouterLink class="navbar-item" :to="localePath('cart')"> Cart</RouterLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <HeaderButtons />
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@use "bulma/sass/components/navbar" with (
  $navbar-item-img-max-height: 2rem,
  $navbar-height: 6.25rem
);
</style>
