<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Input from '@/components/form/Input.vue'
import Header from '@/components/content/Header.vue'
import type { IUserAddress } from '@/interfaces/IUserAddress'

defineProps<{
  header: string
}>()

const { t } = useI18n()

const address = defineModel<IUserAddress>('address', { required: true })
</script>

<template>
  <div>
    <Header :level="3">{{ header }}</Header>

    <div class="columns">
      <div class="column is-half">
        <Input
          v-model:input="address.firstname"
          :label="t('Firstname')"
          name="firstname"
          required
        />
      </div>

      <div class="column is-half">
        <Input
          v-model:input="address.lastname"
          :label="t('Lastname')"
          name="lastname"
          required
        />
      </div>
    </div>

    <div class="columns">
      <div class="column is-full">
        <Input
          v-model:input="address.address"
          :label="t('Address')"
          name="address"
          required
        />
      </div>
    </div>

    <div class="columns">
      <div class="column is-one-fourth">
        <Input
          v-model:input="address.zip"
          :label="t('Zip Code')"
          name="zip"
          required
        />
      </div>

      <div class="column is-three-quarters">
        <Input
          v-model:input="address.city"
          :label="t('City')"
          name="city"
          required
        />
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <Input
          v-model:input="address.phone"
          :label="t('Phone')"
          name="phone"
          type="tel"
          required
        />
      </div>

      <div class="column is-half">
        <Input
          v-model:input="address.country"
          :label="t('Country')"
          name="country"
          required
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
