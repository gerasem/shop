<script setup lang="ts">
import CartSteps from '@/components/cart/CartSteps.vue'
import CartForm from '@/components/cart/CartForm.vue'
import { useCartStore } from '@/stores/CartStore'

const cartStore = useCartStore()
</script>

<template>
  <main class="container is-fluid">
    <CartSteps />

    <CartForm v-if="cartStore.cart" />
  </main>
</template>

<style lang="scss" scoped></style>
