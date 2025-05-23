<script setup lang="ts">
import Button from '@/components/form/Button.vue'
import Input from '@/components/form/Input.vue'
import { useCartStore } from '@/stores/CartStore'
import type { HttpTypes } from '@medusajs/types'
import { computed, ref } from 'vue'

const props = defineProps<{
  loading: boolean
  selectedVariant: HttpTypes.StoreProductVariant | undefined
}>()

const quantity = ref<number>(1)
const cartStore = useCartStore()

const inventoryQuantity = computed(() => {
  if (props.selectedVariant?.inventory_quantity) {
    return props.selectedVariant?.inventory_quantity
  }
  return 1000
})

// add to cart
const handleAddToCart = async () => {
  if (!props.selectedVariant?.id) {
    return
  }
  await cartStore.addToCart(props.selectedVariant.id, quantity.value)
}

const decrementCount = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}
const incrementCount = () => {
  if (quantity.value < inventoryQuantity.value) {
    quantity.value++
  }
}
</script>

<template>
  <div class="add-to-cart__container">
    <div class="add-to-cart__quantity-block">
      <Button
        class="is-white"
        icon="dash-lg"
        :disabled="quantity <= 1"
        @click="decrementCount()"
      ></Button>

      <Input
        v-model="quantity"
        class="add-to-cart__input"
        min="1"
        type="number"
        :max="selectedVariant ? inventoryQuantity : 1000"
      ></Input>

      <Button
        class="is-white"
        icon="plus-lg"
        :disabled="quantity >= inventoryQuantity"
        @click="incrementCount()"
      ></Button>
    </div>

    <div>
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
        icon="bag-plus"
      >
        Add to Cart
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-to-cart {
  &__input {
    width: 50px;
    text-align: center;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  &__quantity-block {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__container {
    display: flex;
    gap: 40px;
  }
}
</style>
