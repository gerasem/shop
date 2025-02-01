<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps<{
  mobileMenu: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleMenu'): void;
}>()

const toggleMenu = () => {
  emit("toggleMenu")
  if(!props.mobileMenu) {
    router.push({ query: { menu: 'open' } })
    document.body.style.overflow = 'hidden'
  } else {
    router.push({ query: {} })
    document.body.style.overflow = 'visible'
  }
}

onMounted(() => {
  if(route.query?.menu === "open" ) {
    router.push({ query: {} })
  }
  window.addEventListener("resize", handlerResize)
})

const handlerResize = () => {
  if(props.mobileMenu && window.innerWidth >= 768) {
    emit("toggleMenu")
    router.replace({ query: {} })
  }
};

onUnmounted(() => window.removeEventListener("resize", handlerResize));
</script>

<template>
  <a @click="toggleMenu()" class="navbar-burger is-hidden-tablet header__navbar-burger" :class="{'is-active': mobileMenu}" role="button" aria-label="menu" aria-expanded="false">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
</template>

<style lang="scss" scoped>
.header {
  &__navbar-burger {
    color: $color-icons;
  }
}
</style>
