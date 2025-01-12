<script setup lang="ts">
import HeaderButtons from '@/core/components/layout/header/HeaderButtons.vue'
import HeaderLogo from '@/core/components/layout/header/HeaderLogo.vue'
import HeaderIcons from '@/core/components/layout/header/HeaderIcons.vue'
import HeaderMenu from '@/core/components/layout/header/HeaderMenu.vue'
import HeaderLanguage from '@/core/components/layout/header/HeaderLanguage.vue'
</script>

<template>
  <nav class="navbar container is-fluid" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <HeaderLogo />
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <HeaderMenu />
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <HeaderLanguage />
        </div>

        <div class="navbar-item">
          <HeaderButtons />
        </div>

        <div class="navbar-item">
          <HeaderIcons />
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
