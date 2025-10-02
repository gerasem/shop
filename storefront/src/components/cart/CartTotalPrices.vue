<script setup lang="ts">
import { localePath } from '@/composables/localePath.ts'
import { useI18n } from 'vue-i18n'
import CartCalculatedPrice from '@/components/cart/CartCalculatedPrice.vue'
import Button from '@/components/form/Button.vue'
import { useCartStore } from '@/stores/CartStore'
import { useLoaderStore } from '@/stores/LoaderStore'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const loaderStore = useLoaderStore()
const router = useRouter()

const { t } = useI18n()

interface IButton {
  name: string
  icon: string
  path: string
  disabled?: boolean
}

const props = defineProps<{
  button: IButton
  onCartPage?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'validate-forms'): void
  (e: 'send-form'): void
}>()

const handleClick = () => {
  if (props.disabled) {
    emit('validate-forms')
  } else {
    emit('send-form')
    router.push({ name: props.button.path })
  }
}
</script>

<template>
  <div class="cart__form">
    <div class="cart__info">
      {{ t('Free Shipping on all orders over 50€') }}
    </div>

    <!-- <div
            v-if="false"
            class="cart__info cart__info--error"
          >
            Coupon Error
          </div> -->

    <div class="cart__form-container">
      <div class="has-text-centered">
        <CartCalculatedPrice
          label="Sub Total"
          :value="cartStore.cart?.subtotal"
        />

        <template v-if="onCartPage">
          <CartCalculatedPrice
            label="Shipping"
            :value="cartStore.cart?.shipping_total"
          />

          <CartCalculatedPrice
            v-if="false"
            class="cart--discount"
            label="Discount"
            :value="0"
          />

          <CartCalculatedPrice
            class="cart--total"
            label="Total price"
            :value="cartStore.cart?.total"
          />
        </template>

        <Button
          @click="handleClick()"
          :icon="button.icon"
          class="mt-4 is-fullwidth"
          :class="{
            'is-loading':
              loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ADD_TO_CART) ||
              loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.EDIT_CART),
            'is-light': disabled,
            'is-primary': !disabled,
          }"
          >{{ t(button.name) }}</Button
        >

        <div class="columns">
          <div class="column"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  &__form {
    position: sticky;
    top: 80px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    @media (max-width: $screen-lg-max) {
      margin: 2rem 0;
    }
  }

  &__info {
    background-color: rgb(255, 249, 241);
    padding: 1rem 1.5rem;
    text-align: center;
    color: $color-secondary;
    font-weight: 600;
    line-height: 24px;

    &--error {
      background-color: rgba(235, 62, 125, 0.25);
      color: $color-primary;
    }
  }

  &__form-container {
    padding: 1.5rem;
  }
}
</style>
