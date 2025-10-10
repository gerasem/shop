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
        <div class="field">
          <label class="label">{{ t('Firstname') }} <span>*</span></label>
          <div class="control">
            <Input
              v-model:input="address.firstname"
              :placeholder="`${t('Firstname')} *`"
              required
            />
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="field">
          <label class="label">{{ t('Lastname') }} <span>*</span></label>
          <div class="control">
            <Input
              v-model:input="address.lastname"
              :placeholder="`${t('Lastname')} *`"
              required
            />
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-full">
        <div class="field">
          <label class="label">{{ t('Address') }} <span>*</span></label>
          <div class="control">
            <Input
              v-model:input="address.address"
              :placeholder="`${t('Address')} *`"
              required
            />
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-one-fourth">
        <div class="field">
          <label class="label">{{ t('Zip Code') }} <span>*</span></label>
          <div class="control">
            <Input
              v-model:input="address.zip"
              inputmode="numeric"
              pattern="\d*"
              :placeholder="`${t('Zip Code')} *`"
              required
            />
          </div>
        </div>
      </div>

      <div class="column is-three-quarters">
        <div class="field">
          <label class="label">{{ t('City') }} <span>*</span></label>
          <div class="control">
            <Input
              v-model:input="address.city"
              :placeholder="`${t('City')} *`"
              required
            />
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-half">
        <div class="field">
          <label class="label">{{ t('Phone') }}</label>
          <div class="control">
            <Input
              v-model:input="address.phone"
              type="tel"
              :placeholder="t('Phone')"
              required
            />
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="field">
          <label
            id="country"
            class="label"
            >{{ t('Country') }} <span>*</span></label
          >
          <div class="control">
            <Input
              v-model:input="address.country"
              :placeholder="`${t('Country')} *`"
              name="country"
              required
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
