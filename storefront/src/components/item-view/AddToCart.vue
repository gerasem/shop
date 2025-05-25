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

const quantityError = computed(() => {
  if(props.selectedVariant?.allow_backorder) {
    return false
  }
  if(!props.selectedVariant?.manage_inventory) {
    return false
  }
  return quantity.value > inventoryQuantity.value
})

const showAvailableCount = computed(() => {
  return inventoryQuantity.value > 10
    ? 'Available in lagre quantity'
    : `Only ${inventoryQuantity.value} items left in stock`
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
        :class="{ 'is-danger': quantityError }"
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

    <p
      v-if="quantityError"
      class="has-text-danger"
    >
      Only {{ inventoryQuantity }} items are currently in stock
    </p>

    <div
      v-else
      class="add-to-cart__button-container"
    >
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

      <p>{{ showAvailableCount }}</p>
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
    align-items: center;
    margin-bottom: 30px;
  }
  &__button-container {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}
</style>
