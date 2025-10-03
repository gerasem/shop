<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '@unhead/vue'
import { useLoaderStore } from '@/stores/LoaderStore'
import Header from '@/components/content/Header.vue'
import { computed, onMounted, ref } from 'vue'
import CartSteps from '@/components/cart/CartSteps.vue'
import CartTotalPrices from '@/components/cart/CartTotalPrices.vue'
import CartAddressFrom from '@/components/cart/CartAddressFrom.vue'
import { useCartStore } from '@/stores/CartStore'
import { useRouter } from 'vue-router'
import CartPaymentAndShippingForm from '@/components/cart/CartPaymentAndShippingForm.vue'
import CartEmailForm from '@/components/cart/CartEmailForm.vue'
import type { IUserAddress } from '@/interfaces/IUserAddress'

const loaderStore = useLoaderStore()
const cartStore = useCartStore()
const router = useRouter()

const { t } = useI18n()

const email = ref<string>(cartStore.cart?.email || '')
const userAddress = ref<IUserAddress>({
  firstname: cartStore.cart?.shipping_address?.first_name || '',
  lastname: cartStore.cart?.shipping_address?.last_name || '',
  address: cartStore.cart?.shipping_address?.address_1 || '',
  city: cartStore.cart?.shipping_address?.city || '',
  country: cartStore.cart?.shipping_address?.country_code || '',
  zip: cartStore.cart?.shipping_address?.postal_code || '',
  phone: cartStore.cart?.shipping_address?.phone || '',
})

const billingAddress = ref<IUserAddress>({
  firstname: cartStore.cart?.billing_address?.first_name || '',
  lastname: cartStore.cart?.billing_address?.last_name || '',
  address: cartStore.cart?.billing_address?.address_1 || '',
  city: cartStore.cart?.billing_address?.city || '',
  country: cartStore.cart?.billing_address?.country_code || '',
  zip: cartStore.cart?.billing_address?.postal_code || '',
  phone: cartStore.cart?.billing_address?.phone || '',
})

// todo get from api
const shipping = ref<string>('')
const selectedShippingId = ref<string>('')

const payment = ref<string>('')
//const isFormValid = ref<boolean>(false)

useSeoMeta({
  title: 'Checkout',
})

onMounted(() => {
  cartStore.getShippingOptions()
  if (cartStore.cart?.items?.length === 0) {
    router.push({ name: 'cart' })
  }
})

const billingAddressSameAsShippingAddress = ref<boolean>(true)

const formRef = ref<HTMLFormElement | null>(null)

const handleSubmit = async (event: Event) => {
  console.log('event', event)
  const form = formRef.value
  if (form?.checkValidity()) {
    console.log('Form is valid')
    console.log(email.value, userAddress.value, billingAddress.value, shipping.value, payment.value)

    const transformUserAddress = {
      first_name: userAddress.value.firstname,
      last_name: userAddress.value.lastname,
      address_1: userAddress.value.address,
      postal_code: userAddress.value.zip,
      city: userAddress.value.city,
      country_code: 'de',
      phone: userAddress.value.phone,
    }

    const transformBillingAddress = {
      first_name: billingAddress.value.firstname,
      last_name: billingAddress.value.lastname,
      address_1: billingAddress.value.address,
      postal_code: billingAddress.value.zip,
      city: billingAddress.value.city,
      country_code: 'de',
      phone: billingAddress.value.phone,
    }

    await cartStore.updateCart({
      updateData: {
        email: email.value,
        shipping_address: transformUserAddress,
        billing_address: billingAddressSameAsShippingAddress.value
          ? transformBillingAddress
          : transformUserAddress,
      },
    })
  } else {
    form?.reportValidity()
  }
}
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

    <pre>
      {{ cartStore.shippingOptions }}
    </pre>

    <form
      ref="formRef"
      @submit.prevent="handleSubmit"
      novalidate
    >
      <div class="columns">
        <div class="column is-three-quarters">
          <Header :level="2">{{ t('Checkout') }}</Header>

          <div class="columns">
            <div class="column is-half">
              <CartEmailForm v-model:email="email" />

              <CartAddressFrom
                :header="t('Address')"
                v-model:address="userAddress"
              />

              <label class="checkbox my-4">
                <input
                  type="checkbox"
                  v-model="billingAddressSameAsShippingAddress"
                />
                Billing address same as shipping address
              </label>

              <CartAddressFrom
                v-if="!billingAddressSameAsShippingAddress"
                class="mt-4"
                :header="t('Billing Address')"
                v-model:address="billingAddress"
              />
            </div>
            <div class="column is-half pl-5">
              <CartPaymentAndShippingForm
                v-model="selectedShippingId"
                :options="cartStore.shippingOptions"
                v-model:payment="payment"
              />
            </div>
          </div>
        </div>

        <div class="column is-one-quarter">
          <CartTotalPrices
            :showAllPrices="true"
            :button="{
              name: 'Weiter',
              icon: 'bag',
              path: 'payment',
            }"
            :disabled="false"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<style lang="scss" scoped></style>
