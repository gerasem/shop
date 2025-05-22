<script setup lang="ts">
import { computed } from 'vue'
import type { HttpTypes } from '@medusajs/types'
import { useProductPrice } from '@/composables/useProductPrice'

const props = defineProps<{
  product: HttpTypes.StoreProduct
  variant: HttpTypes.StoreProductVariant
}>()

const { getProductPrice } = useProductPrice()

const prices = computed(() =>
  getProductPrice({
    product: props.product,
    variantId: props.variant?.id,
  }),
)

const selectedPrice = computed(() =>
  props.variant ? prices.value.variantPrice : prices.value.cheapestPrice,
)
</script>

<template>
  <div
    v-if="selectedPrice"
    class="content"
  >
    <h4
      class="title is-4"
      :class="{ 'has-text-info': selectedPrice.price_type === 'sale' }"
      data-testid="product-price"
      :data-value="selectedPrice.calculated_price_number"
    >
      <span v-if="!variant">From </span>
      {{ selectedPrice.calculated_price }}
    </h4>

    <div v-if="selectedPrice.price_type === 'sale'">
      <p>
        <span class="has-text-grey">Original: </span>
        <span
          class="is-crossed"
          data-testid="original-product-price"
          :data-value="selectedPrice.original_price_number"
        >
          {{ selectedPrice.original_price }}
        </span>
      </p>

      <span class="has-text-info">-{{ selectedPrice.percentage_diff }}%</span>
    </div>
  </div>
</template>

<style scoped>
.is-crossed {
  text-decoration: line-through;
}
</style>
