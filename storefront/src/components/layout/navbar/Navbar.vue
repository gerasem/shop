<script setup lang="ts">
import NavbarContact from '@/components/layout/navbar/NavbarContact.vue'
import NavbarLogo from '@/components/layout/navbar/NavbarLogo.vue'
import NavbarMenu from '@/components/layout/navbar/NavbarMenu.vue'
import LanguageSwitcher from '@/components/layout/navbar/LanguageSwitcher.vue'
import NavbarBurger from '@/components/layout/navbar/NavbarBurger.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import NavbarCart from '@/components/layout/navbar/NavbarCart.vue'

const mobileMenu = ref<boolean>(false)

const toggleMenu = () => {
  mobileMenu.value = !mobileMenu.value
}

const isScrolled = ref(false);
const trigger = ref(null);

const observer = new IntersectionObserver(
  ([entry]) => {
    isScrolled.value = !entry.isIntersecting;
  },
  { rootMargin: "0px 0px 0px 0px", threshold: 0 }
);

onMounted(() => {
  if (trigger.value) observer.observe(trigger.value);
});

onUnmounted(() => {
  if (trigger.value) observer.unobserve(trigger.value);
});
</script>

<template>
  <div ref="trigger" class="navbar__trigger-block" :class="{ 'navbar__trigger-block--hidden': isScrolled }"></div>

  <nav class="navbar is-flex is-flex-wrap-wrap" :class="{ 'navbar--scrolled': isScrolled }" role="navigation"
       aria-label="main navigation">
    <div class="container is-fluid">

      <div class="navbar-brand navbar__navbar-brand">
        <NavbarBurger :mobileMenu="mobileMenu" @toggleMenu="toggleMenu()" />

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

      <div v-if="mobileMenu" class="navbar__mobile-menu">
        <NavbarMenu />

        <div class="navbar-item">
          <LanguageSwitcher />
        </div>

        <div class="navbar-item">
          <NavbarContact />
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

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  transition: height 0.3s ease;

  &--scrolled {
    --bulma-navbar-height: 4rem;
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
  }

  &__trigger-block{
    &--hidden{
      margin-top: -40px;
    }
  }
}
</style>
