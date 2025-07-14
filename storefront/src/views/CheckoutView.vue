<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '@unhead/vue'
import { useLoaderStore } from '@/stores/LoaderStore'
import Header from '@/components/content/Header.vue'
import { onMounted, ref } from 'vue'
import Input from '@/components/form/Input.vue'
import CartSteps from '@/components/cart/CartSteps.vue'
import RadioGroup from '@/components/form/RadioGroup.vue'
import CartTotalPrices from '@/components/cart/CartTotalPrices.vue'

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
    <CartSteps />

    <div class="columns">
      <div class="column is-two-thirds">
        <Header :level="2">{{ t('Checkout') }}</Header>

        <div class="columns">
          <div class="column is-two-thirds">
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
