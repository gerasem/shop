<script setup lang="ts">
import HeaderButtons from '@/core/components/layout/header/HeaderButtons.vue'
import HeaderLogo from '@/core/components/layout/header/HeaderLogo.vue'
import HeaderIcons from '@/core/components/layout/header/HeaderIcons.vue'
import HeaderMenu from '@/core/components/layout/header/HeaderMenu.vue'
import HeaderLanguage from '@/core/components/layout/header/LanguageSwitcher.vue'
import InformationBanner from '@/core/components/layout/header/InformationBanner.vue'
</script>

<template>
  <header>
    <InformationBanner class="is-hidden-mobile" />
  </header>

  <nav class="navbar is-flex container is-fluid" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <HeaderLogo />
    </div>

    <div class="navbar-start is-flex-grow-1 is-align-items-center is-hidden is-flex-tablet">
      <HeaderMenu />
    </div>

    <div class="navbar-end is-flex is-align-items-center">
      <div class="navbar-item is-hidden is-flex-tablet">
        <HeaderLanguage />
      </div>

      <div class="navbar-item is-hidden is-flex-tablet">
        <HeaderButtons />
      </div>

      <div class="navbar-item">
        <HeaderIcons />
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

<style lang="scss" scoped>

</style>
