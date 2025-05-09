<script setup lang="ts">
import NavbarContact from '@/components/navbar/NavbarContact.vue'
import NavbarLogo from '@/components/navbar/NavbarLogo.vue'
import NavbarMenu from '@/components/navbar/NavbarMenu.vue'
import LanguageSwitcher from '@/components/navbar/LanguageSwitcher.vue'
import NavbarBurger from '@/components/navbar/NavbarBurger.vue'
import { ref } from 'vue'
import NavbarCart from '@/components/navbar/NavbarCart.vue'

const mobileMenu = ref<boolean>(false)

const toggleMenu = () => {
  mobileMenu.value = new URLSearchParams(window.location.search).has('menu')
}
</script>

<template>
  <nav
    class="navbar is-flex is-flex-wrap-wrap is-transparent"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container is-fluid">
      <div class="navbar-brand navbar__navbar-brand">
        <NavbarBurger
          :mobileMenu="mobileMenu"
          @toggleMenu="toggleMenu()"
        />

        <NavbarLogo />
      </div>

      <div class="navbar-start is-flex-grow-1 is-align-items-center is-hidden is-flex-tablet">
        <NavbarMenu />
      </div>

      <div class="navbar-end is-flex is-align-items-center">
        <div class="navbar-item is-hidden is-flex-tablet">
          <LanguageSwitcher />
        </div>

        <div class="navbar-item is-hidden is-flex-tablet">
          <NavbarContact />
        </div>

        <div class="navbar-item">
          <NavbarCart />
        </div>
      </div>

      <Transition name="mobile-menu">
        <div
          v-if="mobileMenu"
          class="navbar__mobile-menu"
        >
          <NavbarMenu />

          <div class="navbar-item">
            <LanguageSwitcher />
          </div>

          <div class="navbar-item">
            <NavbarContact />
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style lang="scss">
@use 'bulma/sass/components/navbar' with (
  $navbar-item-img-max-height: 2rem,
  $navbar-height: 3.5rem,
  $navbar-background-color: rgba(255, 255, 255, 1)
);
</style>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: -24px;
  padding-top: 24px;
  margin-bottom: 24px;

  @media (max-width: $screen-md-max) {
    position: static;
    top: unset;
  }

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
    height: calc(100vh - 100px);
    justify-content: space-around;
    user-select: none;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
  }
}

.mobile-menu-enter-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>
