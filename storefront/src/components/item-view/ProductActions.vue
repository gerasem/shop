<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { HttpTypes } from '@medusajs/types'
import { useCartStore } from '@/stores/CartStore'
import { optionsAsKeymap } from '@/utils/productUtils.ts'
import ProductPrice from '@/components/item-view/ProductPrice.vue'
import OptionSelect from '@/components/item-view/OptionSelect.vue'
import Button from '@/components/button/Button.vue'
import { isEqual } from '@/utils/productUtils.ts'

const props = defineProps<{
  product: HttpTypes.StoreProduct
}>()

const cartStore = useCartStore()
const options = ref<Record<string, string | undefined>>({})
const isAdding = ref(false)

// check if only 1 variant
onMounted(() => {
  if (props.product.variants?.length === 1) {
    const variantOptions = optionsAsKeymap(props.product.variants[0].options)
    options.value = variantOptions
  }
})

// selected variant
const selectedVariant = computed(() => {
  if (!props.product.variants?.length) {
    return undefined
  }

  return props.product.variants.find((v) => {
    const variantOptions = optionsAsKeymap(v.options)
    return isEqual(variantOptions, options.value)
  })
})

// valid variant
const isValidVariant = computed(() => {
  return (
    props.product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options.value)
    }) || false
  )
})

// check in stock
const inStock = computed(() => {
  if (!selectedVariant.value) {
    return false
  }
  if (!selectedVariant.value.manage_inventory || selectedVariant.value.allow_backorder) {
    return true
  }
  return selectedVariant.value.inventory_quantity && selectedVariant.value.inventory_quantity > 0
})

// update option value
const setOptionValue = (optionId: string, value: string) => {
  options.value = { ...options.value, [optionId]: value }
}

// add to cart
const handleAddToCart = async () => {
  if (!selectedVariant.value?.id) {
    return
  }
  await cartStore.addToCart(selectedVariant.value.id, 1)
}
</script>

<template>
  <div class="container">
    <!-- Product options (if > 1 option) -->
    <div
      v-if="product.variants && product.variants.length > 1"
      class="field"
    >
      <div
        v-for="option in product.options"
        :key="option.id"
        class="control pb-3"
      >
        <OptionSelect
          :option="option"
          :current="options[option.id]"
          @update-option="setOptionValue(option.id, $event)"
          :title="option.title || ''"
          data-testid="product-options"
          :disabled="isAdding"
        />
      </div>
      <br />
    </div>

    <!-- product prices -->
    <ProductPrice
      v-if="selectedVariant"
      :product="product"
      :variant="selectedVariant"
    />

    <!-- Кнопка "Добавить в корзину" -->
    <!-- <Button
      @click="handleAddToCart"
      :disabled="!inStock || !selectedVariant || isAdding || !isValidVariant"
      class="button is-primary"
      :class="{
        'is-loading': isAdding,
        'is-static': !inStock || !selectedVariant || !isValidVariant,
      }"
      data-testid="add-product-button"
      :icon="selectedVariant ? 'bag' : ''"
    >
      <span v-if="isAdding">Добавление...</span>
      <span v-else-if="!selectedVariant">Choose variant</span>
      <span v-else-if="!inStock || !isValidVariant">Out of Stock</span>
      <span v-else>Add to Cart</span>
    </Button> -->

    <Button
      v-if="isAdding"
      disabled
      class="button is-primary is-loading"
      data-testid="loading"
    >
      Adding...
    </Button>

    <div
      v-else-if="!selectedVariant"
      class="notification is-warning is-light"
    >
      Choose variant
    </div>

    <Button
      v-else-if="!inStock || !isValidVariant"
      disabled
      class="button is-primary is-static"
      data-testid="out-of-stock"
      icon="bag-x"
    >
      Out of inStock
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
  </div>
</template>

<style scoped></style>
