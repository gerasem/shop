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
import CartEmailAndPhoneForm from '@/components/cart/CartEmailAndPhoneForm.vue'

const loaderStore = useLoaderStore()
const cartStore = useCartStore()
const router = useRouter()

const { t } = useI18n()

const contactFormRef = ref(null)
const contactFormBillingRef = ref(null)
const paymentAndShippingFormRef = ref(null)
const emailAndPhoneFormRef = ref(null)

const isContactFormValid = computed(() => contactFormRef.value?.isValid?.valid)
const isContactFormBillingValid = computed(() => contactFormBillingRef.value?.isValid?.valid)
const isPaymentAndShippingFormValid = computed(
  () => paymentAndShippingFormRef.value?.isValid?.valid,
)
const isEmailAndPhoneFormValid = computed(() => emailAndPhoneFormRef.value?.isValid?.valid)
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
  return (
    isPaymentAndShippingFormValid.value &&
    isContactFormValid.value &&
    isEmailAndPhoneFormValid.value &&
    (!billingAddressSameAsShippingAddress.value ? isContactFormBillingValid.value : true)
  )
})

const validateForms = () => {
  contactFormRef.value.validate()
  if (!billingAddressSameAsShippingAddress) {
    contactFormBillingRef.value.validate()
  }
  paymentAndShippingFormRef.value.validate()
  emailAndPhoneFormRef.value.validate()
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

    <div class="columns">
      <div class="column is-two-thirds">
        <Header :level="2">{{ t('Checkout') }}</Header>

        <div class="columns">
          <div class="column is-two-thirds">
            <CartAddressFrom
              ref="contactFormRef"
              :header="t('Address')"
            />

            <label class="checkbox my-4">
              <input
                type="checkbox"
                v-model="billingAddressSameAsShippingAddress"
              />
              Billing address same as shipping address
            </label>

            <CartEmailAndPhoneForm ref="emailAndPhoneFormRef" />

            <CartAddressFrom
              v-if="!billingAddressSameAsShippingAddress"
              ref="contactFormBillingRef"
              class="mt-4"
              :header="t('Billing Address')"
            />
          </div>
          <div class="column is-one-thirds pl-5">
            <CartPaymentAndShippingForm ref="paymentAndShippingFormRef" />
          </div>
        </div>
      </div>

      <div class="column is-one-third">
        <CartTotalPrices
          :onCartPage="true"
          :button="{
            name: 'Weiter',
            icon: 'bag',
            path: 'payment',
          }"
          :disabled="!allFormsValid"
          @validate-forms="validateForms()"
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
