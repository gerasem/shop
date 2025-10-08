<script setup lang="ts">
import RadioGroup from '@/components/form/RadioGroup.vue'
import Header from '@/components/content/Header.vue'
import { useI18n } from 'vue-i18n'
import { computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/CartStore'
import { HttpTypes } from '@medusajs/types'

const cartStore = useCartStore()

onMounted(async () => {
  if (!cartStore.paymentOptions) {
    await cartStore.getPaymentOptions()
  }
})
const { t } = useI18n()

defineEmits<{
  (e: 'update:paymentId', value: string): void
}>()

const paymentId = defineModel<string>('paymentId', { required: true })

const paymentProviderMap: Record<string, string> = {
  pp_system_default: 'Default Payment',
}

const paymentItems = computed(() => {
  console.log('cartStore.paymentProviders', cartStore.paymentOptions)
  if (!cartStore.paymentOptions) {
    return []
  }
  return cartStore.paymentOptions
    .filter((provider: HttpTypes.StorePaymentProvider) => provider.is_enabled)
    .map((provider) => ({
      id: provider.id,
      name: t(paymentProviderMap[provider.id] || provider.id),
      value: provider.id,
    }))
})
</script>

<template>
  <div>
    <Header
      :level="3"
      class="mt-6"
      >{{ t('Payment') }}</Header
    >
    <RadioGroup
      v-model="paymentId"
      name="payment_option"
      :items="paymentItems"
      required
      :label="t('Payment Method')"
    />
  </div>
</template>

<style lang="scss" scoped></style>
