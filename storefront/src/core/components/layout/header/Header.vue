<script setup lang="ts">
import HeaderButtons from '@/core/components/layout/header/HeaderButtons.vue'
import HeaderLogo from '@/core/components/layout/header/HeaderLogo.vue'
import HeaderMenu from '@/core/components/layout/header/HeaderMenu.vue'
import HeaderLanguage from '@/core/components/layout/header/LanguageSwitcher.vue'
import InformationBanner from '@/core/components/layout/header/InformationBanner.vue'
import HeaderBurger from '@/core/components/layout/header/HeaderBurger.vue'
import { ref } from 'vue'
import HeaderCart from '@/core/components/layout/header/HeaderCart.vue'

const mobileMenu = ref<boolean>(false)

const toggleMenu = () => {
  mobileMenu.value = !mobileMenu.value
}
</script>

<template>
  <header>
    <InformationBanner class="is-hidden-mobile" />
  </header>

  <nav class="navbar is-flex container is-fluid" :class="{'is-flex-direction-column': mobileMenu}" role="navigation"
       aria-label="main navigation">
    <div class="navbar-brand header__navbar-brand">
      <HeaderBurger :mobileMenu="mobileMenu" @toggleMenu="toggleMenu()" />

      <HeaderLogo />

      <div class="navbar-item is-hidden-tablet">
        <HeaderCart /> 2
      </div>
    </div>

    <div class="navbar-start is-flex-grow-1 is-align-items-center" :class="{'is-hidden is-flex-tablet': !mobileMenu}">
      <HeaderMenu />
    </div>

    <div class="navbar-end is-flex is-align-items-center">
      <div class="navbar-item" :class="{'is-hidden is-flex-tablet': !mobileMenu}">
        <HeaderLanguage />
      </div>

      <div class="navbar-item" :class="{'is-hidden is-flex-tablet': !mobileMenu}">
        <HeaderButtons />
      </div>

      <div class="navbar-item is-hidden is-flex-tablet">
        <HeaderCart /> 1
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
.header {
  &__navbar-brand {
    @media (max-width: $screen-md-max) {
      flex: 1;
    }
  }
}
</style>
