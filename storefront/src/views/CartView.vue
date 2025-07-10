<script setup lang="ts">
import CartItem from '@/components/cart/CartItem.vue'
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '@unhead/vue'
import { useLoaderStore } from '@/stores/LoaderStore'
import Header from '@/components/content/Header.vue'
import { useCartStore } from '@/stores/CartStore'
import { convertToLocale } from '@/utils/priceUtils'
import { computed } from 'vue'
import CartCalculatedPrice from '@/components/cart/CartCalculatedPrice.vue'
import Button from '@/components/form/Button.vue'

const cartStore = useCartStore()
const loaderStore = useLoaderStore()

const { t } = useI18n()

const items = computed(() => {
  const itemsInCart = cartStore.cart?.items
  return itemsInCart?.sort((a, b) => a.title.localeCompare(b.title))
})

const deleteItemsFromCart = () => {}

useSeoMeta({
  title: 'Shopping Cart',
})
</script>

<template>
  <!--   <div
    v-if="loaderStore.isLoadingKey('addToCart')"
    class="skeleton"
  >
    <div class="skeleton-item"></div>
  </div> -->

  <main class="container is-fluid">
    <div class="columns">
      <div class="column is-two-thirds">
        <Header :level="2">Shopping Cart</Header>

        <CartItem
          v-for="item in items"
          :key="item.id"
          :item="item"
        />

        <p v-if="!items?.length">{{ t('Shopping cart is empty') }}</p>
      </div>

      <div class="column is-one-third">
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

              <Button
                icon="bag"
                class="mt-2 is-primary is-fullwidth"
                >{{ t('Checkout') }}</Button
              >

              <div class="columns">
                <div class="column"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.cart {
  &__form {
    position: sticky;
    top: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    margin-top: 30px;
    @media (max-width: $screen-lg-max) {
      margin: 2rem 0;
    }
  }

  &__form-container {
    padding: 1.5rem;
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
}
</style>
