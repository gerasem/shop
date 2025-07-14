<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '@unhead/vue'
import { useLoaderStore } from '@/stores/LoaderStore'
import Header from '@/components/content/Header.vue'
import { onMounted, ref } from 'vue'
import CartSteps from '@/components/cart/CartSteps.vue'
import RadioGroup from '@/components/form/RadioGroup.vue'
import CartTotalPrices from '@/components/cart/CartTotalPrices.vue'
import CartAddressFrom from '@/components/cart/CartAddressFrom.vue'

const loaderStore = useLoaderStore()

const { t } = useI18n()

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
    <CartSteps />

    <div class="columns">
      <div class="column is-two-thirds">
        <Header :level="2">{{ t('Checkout') }}</Header>

        <div class="columns">
          <div class="column is-two-thirds">
            <Header :level="3">{{ t('Address') }}</Header>

            <CartAddressFrom />

            <label class="checkbox">
              <input
                type="checkbox"
                checked
              />
              Billing address same as shipping address
            </label>
          </div>
          <div class="column is-one-thirds pl-5">
            <Header :level="4">{{ t('Shipping') }}</Header>

            <RadioGroup
              :items="[
                { name: 'Dhl', value: 'dhl' },
                { name: 'Hermes', value: 'hermes' },
              ]"
              class="is-flex-direction-column"
            />

            <Header
              :level="4"
              class="mt-6"
              >{{ t('Payment') }}</Header
            >

            <RadioGroup
              :items="[
                { name: 'PayPal', value: 'paypal' },
                { name: 'Überweisung', value: 'ueberweisung' },
              ]"
              class="is-flex-direction-column"
            />
          </div>
        </div>
      </div>

      <div class="column is-one-third">
        <CartTotalPrices :button="{ name: 'Weiter', icon: 'bag', path: 'checkout' }" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
