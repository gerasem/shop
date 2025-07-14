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
  title: 'Payment',
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
        <Header :level="2">{{ t('Payment') }}</Header>
      </div>

      <div class="column is-one-third">
        <CartTotalPrices :button="{ name: 'Pay', icon: 'bag', path: 'checkout' }" />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
