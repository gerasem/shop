<script setup lang="ts">
import { convertToLocale } from '@/utils/priceUtils'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  value: number | undefined
  label: string
}>()
</script>

<template>
  <div class="columns cart__price-container">
    <div class="column">{{ t(label) }}:</div>
    <div class="column">
      <span
        v-if="value !== undefined"
        class="cart__form-price"
        >{{ convertToLocale({ amount: value }) }}</span
      >

      <span v-else> - </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  &__price-container {
    margin-bottom: 0;
  }

  &__form-price {
    font-weight: 600;
  }

  &--total .cart__form-price {
    color: $color-secondary;
  }

  &--discount .cart__form-price {
    color: $color-primary;
  }
}
</style>
