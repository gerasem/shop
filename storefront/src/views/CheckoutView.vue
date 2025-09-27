<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '@unhead/vue'
import { useLoaderStore } from '@/stores/LoaderStore'
import Header from '@/components/content/Header.vue'
import { computed, onMounted, ref } from 'vue'
import CartSteps from '@/components/cart/CartSteps.vue'
import RadioGroup from '@/components/form/RadioGroup.vue'
import CartTotalPrices from '@/components/cart/CartTotalPrices.vue'
import CartAddressFrom from '@/components/cart/CartAddressFrom.vue'
import { useCartStore } from '@/stores/CartStore'
import { useRouter } from 'vue-router'

const loaderStore = useLoaderStore()
const cartStore = useCartStore()
const router = useRouter()

const { t } = useI18n()

const contactFormRef = ref(null)
const contactFormBillingRef = ref(null)

const isContactFormValid = computed(() => contactFormRef.value?.isValid?.valid)
const isContactFormBillingValid = computed(() => contactFormBillingRef.value?.isValid?.valid)

useSeoMeta({
  title: 'Checkout',
})

onMounted(() => {
  if (cartStore.cart?.items?.length === 0) {
    router.push({ name: 'cart' })
  }
})

const billingAddressSameAsShippingAddress = ref<boolean>(true)

const allFormsValid = computed(() => {
  if (!billingAddressSameAsShippingAddress.value) {
    return isContactFormValid.value && isContactFormBillingValid.value
  } else {
    return isContactFormValid.value
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
      <div class="column is-two-thirds">
        <Header :level="2">{{ t('Checkout') }}</Header>

        <div class="columns">
          <div class="column is-two-thirds">
            <CartAddressFrom
              ref="contactFormRef"
              :header="t('Address')"
            />

            <label class="checkbox mt-4">
              <input
                type="checkbox"
                v-model="billingAddressSameAsShippingAddress"
              />
              Billing address same as shipping address {{ isContactFormBillingValid }}
            </label>

            <CartAddressFrom
              v-if="!billingAddressSameAsShippingAddress"
              ref="contactFormBillingRef"
              class="mt-4"
              :header="t('Billing Address')"
            />
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
        <CartTotalPrices
          :onCartPage="true"
          :button="{
            name: 'Weiter',
            icon: 'bag',
            path: 'checkout',
            disabled: !allFormsValid,
          }"
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
