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

const email = ref<string>('')
const userAddress = ref<IUserAddress>({
  firstname: '',
  lastname: '',
  address: '',
  city: '',
  country: '',
  zip: '',
  phone: '',
})

const billingAddress = ref<IUserAddress>({
  firstname: '',
  lastname: '',
  address: '',
  city: '',
  country: '',
  zip: '',
  phone: '',
})

const shipping = ref<string>('')
const payment = ref<string>('')
//const isFormValid = ref<boolean>(false)

useSeoMeta({
  title: 'Checkout',
})

onMounted(() => {
  if (cartStore.cart?.items?.length === 0) {
    router.push({ name: 'cart' })
  }
})

const billingAddressSameAsShippingAddress = ref<boolean>(true)

const formRef = ref<HTMLFormElement | null>(null)

const handleSubmit = (event: Event) => {
  const form = formRef.value
  if (form?.checkValidity()) {
    console.log('Form is valid')
    console.log(email, userAddress, billingAddress, shipping, payment)

    
  } else {
    form?.reportValidity() // Показать нативные сообщения об ошибках
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
                v-model:payment="payment"
                v-model:shipping="shipping"
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
