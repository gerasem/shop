<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '@unhead/vue'
import { useLoaderStore } from '@/stores/LoaderStore'
import Header from '@/components/content/Header.vue'
import { onMounted, ref, watch } from 'vue'
import CartSteps from '@/components/cart/CartSteps.vue'
import CartTotalPrices from '@/components/cart/CartTotalPrices.vue'
import CartAddressFrom from '@/components/cart/CartAddressFrom.vue'
import { useCartStore } from '@/stores/CartStore'
import { useRouter } from 'vue-router'
import CartShippingOptions from '@/components/cart/CartShippingOptions.vue'
import CartPaymentOptions from '@/components/cart/CartPaymentOptions.vue'
import CartEmailForm from '@/components/cart/CartEmailForm.vue'
import type { IUserAddress } from '@/interfaces/IUserAddress'
import { useToastStore } from '@/stores/ToastStore'

const toastStore = useToastStore()
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

const selectedShippingId = ref<string>('')

watch(selectedShippingId, (newVal) => {
  console.log('Selected shipping option ID changed:', newVal)
  if (
    cartStore.cart?.shipping_methods &&
    selectedShippingId.value !== cartStore.cart?.shipping_methods[0]?.shipping_option_id
  ) {
    cartStore.selectShippingOption(newVal)
  }
})
const selectedPaymentId = ref<string>('')
//const isFormValid = ref<boolean>(false)

useSeoMeta({
  title: 'Checkout',
})

onMounted(() => {
  if (cartStore.cart?.items?.length === 0) {
    router.push({ name: 'cart' })
  }

  if (cartStore.cart?.shipping_methods && cartStore.cart?.shipping_methods[0]?.shipping_option_id) {
    selectedShippingId.value = cartStore.cart?.shipping_methods[0].shipping_option_id
  }
})

const billingAddressSameAsShippingAddress = ref<boolean>(true)

const formRef = ref<HTMLFormElement | null>(null)

const handleSubmit = async () => {
  const form = formRef.value
  if (form?.checkValidity()) {
    console.log('Form is valid')

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

    router.push({ name: 'payment' })
  } else {
    form?.reportValidity()
    toastStore.addError(`Please fill all required fields`)
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

    <form
      ref="formRef"
      @submit.prevent="handleSubmit()"
      novalidate
    >
      <div class="columns">
        <div class="column is-two-thirds-tablet is-three-quarters-fullhd">
          <Header :level="1">{{ t('Checkout') }}</Header>

          <div class="columns is-multiline">
            <div class="column is-full-tablet is-half-desktop">
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
            <div class="column is-full-tablet is-half-desktop pl-5">
              <CartShippingOptions
                v-if="cartStore.cart"
                v-model:shippingId="selectedShippingId"
              />
              <CartPaymentOptions
                v-if="cartStore.cart"
                v-model:paymentId="selectedPaymentId"
              />
            </div>
          </div>
        </div>

        <div class="column is-one-third-tablet is-one-quarter-fullhd">
          <CartTotalPrices
            :button="{
              name: 'Weiter',
              icon: 'bag',
            }"
            :disabled="false"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<style lang="scss" scoped></style>
