<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import CartItem from '@/components/cart/CartItem.vue'
import { useMeta } from '@/composables/useMeta.ts'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Loader from '@/components/common/Loader.vue'

useMeta('Cart', 'cart description')

const { t } = useI18n()

onMounted(async () => {})

const deleteItemsFromCart = () => {}
</script>

<template>
  <Loader />

  <InformationBanner />

  <Navbar />

  <div class="container is-fluid">
    <template v-if="true">
      <div class="columns">
        <div class="column is-two-thirds">
          <h2 class="title is-2">Shopping Cart</h2>

          <template v-for="item in 5" :key="item">
            <CartItem item="" />
          </template>
        </div>

        <div class="column is-one-third">
          <div class="cart__form">
            <div class="cart__info">
              {{ t('Free Shipping on all orders over 50€') }}
            </div>

            <div class="cart__info cart__info--error">Coupon Error</div>

            <div class="cart__form-container">
              <div class="has-text-centered">
                <div class="columns">
                  <div class="column">{{ t('Sub-Total') }}:</div>
                  <div class="column">
                    <span class="cart__form-price">{{ 0 }}</span>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">{{ t('Shipping') }}:</div>
                  <div class="column">
                    <span class="cart__form-price"> 5€ </span>
                  </div>
                </div>

                <div class="columns" v-if="true">
                  <div class="column cart__form-price--discount">Discount ():</div>
                  <div class="column">
                    <span class="cart__form-price cart__form-price--discount">
                      {{ 0 }}
                    </span>
                  </div>
                </div>

                <div class="columns">
                  <div class="column">{{ t('Total price') }}:</div>
                  <div class="column">
                    <span class="cart__form-price cart__form-price--total">
                      {{ 0 }}
                    </span>
                  </div>
                </div>

                <div class="columns">
                  <div class="column"></div>
                </div>

                <div class="columns">
                  <div class="column"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <h2 class="title is-2">Shopping Cart</h2>

      <p>{{ t('Shopping cart is empty') }}</p>
    </template>
  </div>

  <Footer />
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

  &__form-price {
    font-weight: 600;

    &--total {
      color: $color-secondary;
    }

    &--discount {
      color: $color-primary;
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
}
</style>
