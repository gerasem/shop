<script setup lang="ts">
import { onMounted } from 'vue'
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
  //console.log("toggle Menu function")
  emit("toggleMenu")
  if(!props.mobileMenu) {
    router.push({ query: { menu: 'open' } })
    document.body.style.overflow = 'hidden'
  } else {
    router.push({ query: {} })
    //todo replace with body:has(dialog[open]
    document.body.style.overflow = 'visible'
  }
}

onMounted(() => {
  //console.log("route.query?.menu", route.query?.menu)
  if(route.query?.menu === "open" ) {
    //console.log("remove get param open")
    router.push({ query: {} })
  }
})


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
