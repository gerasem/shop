<script setup lang="ts">
import RadioGroup from '@/components/form/RadioGroup.vue'
import Header from '@/components/content/Header.vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()

const shipping = defineModel<string>('shipping', { required: true })
const payment = defineModel<string>('payment', { required: true })
</script>

<template>
  <div>
    <Header :level="3">{{ t('Shipping') }}</Header>

    <RadioGroup
      v-model:input="shipping"
      :items="[
        { name: 'Dhl', value: 'dhl' },
        { name: 'Hermes', value: 'hermes' },
      ]"
      class="is-flex-direction-column"
    />

    <Header
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
    />
  </div>
</template>

<style lang="scss" scoped></style>
