<script setup lang="ts">
import CartTotalPrices from '@/components/cart/CartTotalPrices.vue'
import { paymentProviderMap } from '@/utils/paymentUtils'
import CartSteps from '@/components/cart/CartSteps.vue'
import { useLoaderStore } from '@/stores/LoaderStore'
import Header from '@/components/content/Header.vue'
import { useCartStore } from '@/stores/CartStore'
import { useSeoMeta } from '@unhead/vue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const loaderStore = useLoaderStore()
const router = useRouter()
const cartStore = useCartStore()

const { t } = useI18n()

useSeoMeta({
  title: 'Payment',
})

onMounted(() => {
  if (cartStore.cart?.items?.length === 0) {
    router.push({ name: 'cart' })
  }
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
    <CartSteps />

    <div class="columns">
      <div class="column is-two-thirds-tablet is-three-quarters-desktop">
        <Header :level="1">{{ t('Payment') }}</Header>

        <pre>
          {{ cartStore.cart }}
        </pre>

        <div v-if="cartStore.cart">
          <div class="columns">
            <div
              v-if="cartStore.cart.shipping_address"
              class="column"
            >
              <Header :level="3">{{ t('Shipping Address') }}</Header>

              <p>
                {{ cartStore.cart.shipping_address.first_name }}
                {{ cartStore.cart.shipping_address.last_name }}
              </p>
              <p>{{ cartStore.cart.shipping_address.address_1 }}</p>
              <p>
                {{ cartStore.cart.shipping_address.postal_code }}
                {{ cartStore.cart.shipping_address.city }}
              </p>
              <p>
                {{ cartStore.cart.shipping_address.phone }}
                {{ cartStore.cart.shipping_address.country_code }}
              </p>

              <p>{{ cartStore.cart.email }}</p>
            </div>

            <div
              v-if="cartStore.cart.billing_address"
              class="column"
            >
              <Header :level="3">{{ t('Billing Address') }}</Header>

              <p v-if="cartStore.cart.billing_address.first_name === ''">
                Billing and delivery address are the same.
              </p>

              <template v-else>
                <p>
                  {{ cartStore.cart.billing_address.first_name }}
                  {{ cartStore.cart.billing_address.last_name }}
                </p>
                <p>{{ cartStore.cart.billing_address.address_1 }}</p>
                <p>
                  {{ cartStore.cart.billing_address.postal_code }}
                  {{ cartStore.cart.billing_address.city }}
                </p>
                <p>
                  {{ cartStore.cart.billing_address.phone }}
                  {{ cartStore.cart.billing_address.country_code }}
                </p>

                <p>{{ cartStore.cart.email }}</p>
              </template>
            </div>
          </div>

          <div class="columns">
            <div
              v-if="cartStore.cart.shipping_methods"
              class="column"
            >
              <Header :level="3">{{ t('Shipping Method') }}</Header>
              <p>{{ cartStore.cart.shipping_methods[0].name }}</p>
            </div>

            <div
              v-if="cartStore.cart.payment_collection?.payment_sessions"
              class="column"
            >
              <Header :level="3">{{ t('Payment Method') }}</Header>
              <p>
                {{
                  t(
                    paymentProviderMap[
                      cartStore.cart.payment_collection.payment_sessions[0].provider_id
                    ],
                  )
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-one-third-tablet is-one-quarter-desktop">
        <CartTotalPrices :button="{ name: 'Pay', icon: 'bag' }" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
