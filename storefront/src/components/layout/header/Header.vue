<script setup lang="ts">
import HeaderContact from '@/components/layout/header/HeaderContact.vue'
import HeaderLogo from '@/components/layout/header/HeaderLogo.vue'
import HeaderMenu from '@/components/layout/header/HeaderMenu.vue'
import HeaderLanguage from '@/components/layout/header/LanguageSwitcher.vue'
import InformationBanner from '@/components/layout/header/InformationBanner.vue'
import HeaderBurger from '@/components/layout/header/HeaderBurger.vue'
import { ref } from 'vue'
import HeaderCart from '@/components/layout/header/HeaderCart.vue'

const mobileMenu = ref<boolean>(false)

const toggleMenu = () => {
  mobileMenu.value = !mobileMenu.value
}
</script>

<template>
  <header>
    <InformationBanner class="is-hidden-mobile" />
  </header>

  <nav class="navbar is-flex is-flex-wrap-wrap container is-fluid" role="navigation"
       aria-label="main navigation">
    <div class="navbar-brand header__navbar-brand">
      <HeaderBurger :mobileMenu="mobileMenu" @toggleMenu="toggleMenu()" />

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
        <HeaderContact />
      </div>

      <div class="navbar-item">
        <HeaderCart />
      </div>
    </div>

    <div v-if="mobileMenu" class="header__mobile-menu">
      <HeaderMenu />

      <div class="navbar-item">
        <HeaderLanguage />
      </div>

      <div class="navbar-item">
        <HeaderContact />
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

  &__mobile-menu {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
