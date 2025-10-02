<script setup lang="ts">
import { defineRule, configure } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useForm } from 'vee-validate'
import RadioGroup from '@/components/form/RadioGroup.vue'
import Header from '@/components/content/Header.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineRule('required', required)
configure({
  generateMessage: (ctx) => {
    const field = t(ctx.field)
    return {
      required: t('field_required', { field }),
    }[ctx.rule.name]
  },
})

const { errors, defineField, validate, meta } = useForm<{
  shipping: string
  payment: string
}>({
  validationSchema: {
    shipping: 'required',
    payment: 'required',
  },
})
const [shipping, shippingAttrs] = defineField('shipping')
const [payment, paymentAttrs] = defineField('payment')

defineExpose({
  isValid: meta,
  validate,
})
</script>

<template>
  <div>
    <Header :level="3">{{ t('Shipping') }}</Header>

    <RadioGroup
      v-model:input="shipping"
      v-bind="shippingAttrs"
      :items="[
        { name: 'Dhl', value: 'dhl' },
        { name: 'Hermes', value: 'hermes' },
      ]"
      class="is-flex-direction-column"
    />
    <p
      v-if="errors.shipping"
      class="has-text-danger"
    >
      {{ errors.shipping }}
    </p>

    <Header
      :level="3"
      class="mt-6"
      >{{ t('Payment') }}</Header
    >
    <RadioGroup
      v-model:input="payment"
      v-bind="paymentAttrs"
      :items="[
        { name: 'PayPal', value: 'paypal' },
        { name: 'Überweisung', value: 'ueberweisung' },
      ]"
      class="is-flex-direction-column"
      :error="errors.payment"
    />
    <p
      v-if="errors.payment"
      class="has-text-danger"
    >
      {{ errors.payment }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
