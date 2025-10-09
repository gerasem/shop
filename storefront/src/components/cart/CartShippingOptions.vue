<script setup lang="ts">
import RadioGroup from '@/components/form/RadioGroup.vue'
import Header from '@/components/content/Header.vue'
import { useI18n } from 'vue-i18n'
import { computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/CartStore'
import { convertToLocale } from '@/utils/priceUtils'

const cartStore = useCartStore()

onMounted(async () => {
  if (!cartStore.shippingOptions) {
    await cartStore.getShippingOptions()
  }
})
const { t } = useI18n()

defineEmits<{
  (e: 'update:shippingId', value: string): void
}>()

const shippingId = defineModel<string>('shippingId', { required: true })

const shippingItems = computed(() => {
  console.log('cartStore.shippingOptions', cartStore.shippingOptions)
  if (!cartStore.shippingOptions) {
    return []
  }
  return cartStore.shippingOptions
    .filter((option) => option.provider.is_enabled && !option.insufficient_inventory)
    .map((option) => ({
      id: option.id,
      name: option.name,
      value: option.id,
      description: option.type.description || '',
      price: convertToLocale({
        amount: option.amount,
      }),
    }))
})

const selectedShipping = computed(() => {
  if (!shippingItems.value) {
    return
  }
  return shippingItems.value.find((opt) => opt.id === shippingId.value)
})
</script>

<template>
  <div>
    <Header :level="3">{{ t('Shipping') }}</Header>

    <template v-if="!shippingItems.length">
      <div class="skeleton-lines">
        <div></div>
      </div>
      <div class="mt-5 skeleton-lines">
        <div></div>
      </div>
    </template>

    <RadioGroup
      v-else
      v-model="shippingId"
      name="shipping_option"
      :items="shippingItems"
      required
    />

    <div
      v-if="selectedShipping"
      class="mt-4 p-4 has-background-info-light"
    >
      <p class="has-text-weight-semibold">{{ selectedShipping.name }}</p>
      <p class="is-size-7 has-text-grey">{{ selectedShipping.description }}</p>
      <p class="has-text-weight-bold">{{ selectedShipping.price }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
