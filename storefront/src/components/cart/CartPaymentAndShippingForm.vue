<script setup lang="ts">
import RadioGroup from '@/components/form/RadioGroup.vue'
import Header from '@/components/content/Header.vue'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { useCartStore } from '@/stores/CartStore'
import { HttpTypes } from '@medusajs/types'
import { convertToLocale } from '@/utils/priceUtils'

const cartStore = useCartStore()

const { t } = useI18n()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const modelValue = defineModel<string>('modelValue', { required: true })

const payment = defineModel<string>('payment', { required: true })

const radioItems = computed(() => {
  if (!cartStore.shippingOptions) {
    return
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

const selectedOption = computed(() => {
  if (!radioItems.value) {
    return
  }
  const selectedId = modelValue.value
  return radioItems.value.find((opt) => opt.id === selectedId)
})
</script>

<template>
  <div>
    <Header :level="3">{{ t('Shipping') }}</Header>

    <RadioGroup
      v-if="radioItems"
      v-model="modelValue"
      name="shipping_option"
      :items="radioItems"
      :label="t('Choose Shipping')"
      required
    />

    <div
      v-if="selectedOption"
      class="mt-4 p-4 has-background-info-light"
    >
      <p class="has-text-weight-semibold">{{ selectedOption.name }}</p>
      <p class="is-size-7 has-text-grey">{{ selectedOption.description }}</p>
      <p class="has-text-weight-bold">{{ selectedOption.price }}</p>
    </div>
    <!-- <Header
      :level="3"
      class="mt-6"
      >{{ t('Payment') }}</Header
    >
    <RadioGroup

      v-model:input="payment"
      :items="[
        { name: 'PayPal', value: 'paypal' },
        { name: 'Überweisung', value: 'ueberweisung' },
      ]"
      class="is-flex-direction-column"
    /> -->
  </div>
</template>

<style lang="scss" scoped></style>
