<script setup lang="ts">
import CartItem from '@/components/cart/CartItem.vue'
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '@unhead/vue'
import { useLoaderStore } from '@/stores/LoaderStore'
import Header from '@/components/content/Header.vue'
import { useCartStore } from '@/stores/CartStore'
import { computed, onMounted, ref } from 'vue'
import CartCalculatedPrice from '@/components/cart/CartCalculatedPrice.vue'
import Button from '@/components/form/Button.vue'
import BreadcrumbCheckout from '@/components/breadcrumb/BreadcrumbCheckout.vue'
import Input from '@/components/form/Input.vue'

const cartStore = useCartStore()
const loaderStore = useLoaderStore()

const { t } = useI18n()

interface IUser {
  firstname: string
  lastname: string
  email: string
  street: string
  house: string
  city: string
  country: string
  zip: string
  phone: string
}
const user = ref<IUser>({
  firstname: '',
  lastname: '',
  email: '',
  street: '',
  house: '',
  city: '',
  country: '',
  zip: '',
  phone: '',
})

useSeoMeta({
  title: 'Checkout',
})

onMounted(() => {
  //todo go to cart page if cart is empty
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
        <div class="checkout__title-container">
          <BreadcrumbCheckout />
          <Header :level="2">{{ t('Checkout') }}</Header>
        </div>

        <Header :level="3">{{ t('Address') }}</Header>

        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label">{{ t('Firstname') }}</label>
              <div class="control">
                <Input
                  v-model:input="user.firstname"
                  :placeholder="t('Firstname')"
                />
              </div>
            </div>
          </div>

          <div class="column is-half">
            <div class="field">
              <label class="label">{{ t('Lastname') }}</label>
              <div class="control">
                <Input
                  v-model:input="user.lastname"
                  :placeholder="t('Lastname')"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label">{{ t('Email') }}</label>
              <div class="control">
                <Input
                  v-model:input="user.email"
                  type="email"
                  :placeholder="t('Email')"
                />
              </div>
            </div>
          </div>

          <div class="column is-half">
            <div class="field">
              <label class="label">{{ t('Phone') }}</label>
              <div class="control">
                <Input
                  v-model:input="user.phone"
                  type="tel"
                  :placeholder="t('Phone')"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-four-fifths">
            <div class="field">
              <label class="label">{{ t('Street') }}</label>
              <div class="control">
                <Input
                  v-model:input="user.street"
                  :placeholder="t('Street')"
                />
              </div>
            </div>
          </div>

          <div class="column is-one-fifths">
            <div class="field">
              <label class="label">{{ t('House') }}</label>
              <div class="control">
                <Input
                  v-model:input="user.house"
                  :placeholder="t('House')"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-one-fifths">
            <div class="field">
              <label class="label">{{ t('Zip Code') }}</label>
              <div class="control">
                <Input
                  v-model:input="user.zip"
                  :placeholder="t('Zip Code')"
                />
              </div>
            </div>
          </div>

          <div class="column is-three-fifths">
            <div class="field">
              <label class="label">{{ t('City') }}</label>
              <div class="control">
                <Input
                  v-model:input="user.city"
                  :placeholder="t('City')"
                />
              </div>
            </div>
          </div>

          <div class="column is-one-fifths">
            <div class="field">
              <label class="label">{{ t('Country') }}</label>
              <div class="control">
                <Input
                  v-model:input="user.country"
                  :placeholder="t('Country')"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="columns"></div>
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
                class="mt-4 is-primary is-fullwidth"
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
.checkout {
  &__title-container {
    display: flex;
    gap: 40px;
    align-items: center;
    margin-bottom: 40px;
  }
}
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
