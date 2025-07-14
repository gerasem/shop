<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Input from '@/components/form/Input.vue'

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
</script>

<template>
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
</template>

<style scoped></style>
