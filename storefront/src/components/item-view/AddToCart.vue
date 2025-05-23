<script setup lang="ts">
import Button from '@/components/button/Button.vue'
import { useCartStore } from '@/stores/CartStore'
import type { HttpTypes } from '@medusajs/types'

const props = defineProps<{
  loading: boolean
  selectedVariant: HttpTypes.StoreProductVariant | undefined
}>()

const cartStore = useCartStore()

// add to cart
const handleAddToCart = async () => {
  if (!props.selectedVariant?.id) {
    return
  }
  await cartStore.addToCart(props.selectedVariant.id, 1)
}
</script>

<template>
  <Button
    v-if="loading"
    disabled
    class="button is-primary is-loading"
    data-testid="loading"
  >
    Adding...
  </Button>

  <Button
    v-else
    @click="handleAddToCart"
    class="button is-primary"
    data-testid="add-to-cart"
    icon="bag"
  >
    Add to Cart
  </Button>
</template>

<style lang="scss" scoped></style>
