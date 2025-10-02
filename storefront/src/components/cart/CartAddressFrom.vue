<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { defineRule, configure } from 'vee-validate'
import { required, min } from '@vee-validate/rules'
import Input from '@/components/form/Input.vue'
import Header from '@/components/content/Header.vue'
import { ref } from 'vue'

defineProps<{
  header: string
}>()

defineRule('required', required)
defineRule('min', min)

const { t } = useI18n()
configure({
  generateMessage: (ctx) => {
    const field = t(ctx.field)
    return {
      required: t('field_required', { field }),
      min: t('min_length', { field, length: ctx.rule.params[0] }),
    }[ctx.rule.name]
  },
})

interface IUser {
  firstname: string
  lastname: string
  street: string
  house: string
  city: string
  country: string
  zip: string
}

const { errors, defineField, validate, meta } = useForm<IUser>({
  validationSchema: {
    firstname: 'required|min:2',
    lastname: 'required|min:2',
    street: 'required',
    house: 'required',
    city: 'required',
    country: 'required',
    zip: 'required|min:4',
  },
})

const [firstname, firstnameAttrs] = defineField('firstname')
const [lastname, lastnameAttrs] = defineField('lastname')
const [street, streetAttrs] = defineField('street')
const [house, houseAttrs] = defineField('house')
const [city, cityAttrs] = defineField('city')
const [country, countryAttrs] = defineField('country')
const [zip, zipAttrs] = defineField('zip')

const phone = ref<string>('')

defineExpose({
  isValid: meta,
  validate,
  address: {
    first_name: firstname,
    last_name: lastname,
    address_1: `${street} ${house}`,
    postal_code: zip,
    city,
    country_code: 'de',
    phone: phone.value,
  },
})
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
              v-model:input="firstname"
              v-bind="firstnameAttrs"
              :placeholder="`${t('Firstname')} *`"
              :class="{ 'is-danger': errors.firstname }"
            />
            <p
              v-if="errors.firstname"
              class="has-text-danger"
            >
              {{ errors.firstname }}
            </p>
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="field">
          <label class="label">{{ t('Lastname') }} <span>*</span></label>
          <div class="control">
            <Input
              v-model:input="lastname"
              v-bind="lastnameAttrs"
              :placeholder="`${t('Lastname')} *`"
              :class="{ 'is-danger': errors.lastname }"
            />
            <p
              v-if="errors.lastname"
              class="has-text-danger"
            >
              {{ errors.lastname }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-three-quarters">
        <div class="field">
          <label class="label">{{ t('Street') }} <span>*</span></label>
          <div class="control">
            <Input
              v-model:input="street"
              v-bind="streetAttrs"
              :placeholder="`${t('Street')} *`"
              :class="{ 'is-danger': errors.street }"
            />
            <p
              v-if="errors.street"
              class="has-text-danger"
            >
              {{ errors.street }}
            </p>
          </div>
        </div>
      </div>

      <div class="column is-one-quarter">
        <div class="field">
          <label class="label">{{ t('House') }} <span>*</span></label>
          <div class="control">
            <Input
              v-model:input="house"
              v-bind="houseAttrs"
              :placeholder="`${t('House')} *`"
              :class="{ 'is-danger': errors.house }"
            />
            <p
              v-if="errors.house"
              class="has-text-danger"
            >
              {{ errors.house }}
            </p>
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
              v-model:input="zip"
              v-bind="zipAttrs"
              :placeholder="`${t('Zip Code')} *`"
              :class="{ 'is-danger': errors.zip }"
            />
            <p
              v-if="errors.zip"
              class="has-text-danger has-text-danger"
            >
              {{ errors.zip }}
            </p>
          </div>
        </div>
      </div>

      <div class="column is-three-quarters">
        <div class="field">
          <label class="label">{{ t('City') }} <span>*</span></label>
          <div class="control">
            <Input
              v-model:input="city"
              v-bind="cityAttrs"
              :placeholder="`${t('City')} *`"
              :class="{ 'is-danger': errors.city }"
            />
            <p
              v-if="errors.city"
              class="has-text-danger"
            >
              {{ errors.city }}
            </p>
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
              v-model:input="phone"
              type="tel"
              :placeholder="t('Phone')"
            />
          </div>
        </div>
      </div>

      <div class="column is-half">
        <div class="field">
          <label class="label">{{ t('Country') }} <span>*</span></label>
          <div class="control">
            <Input
              v-model:input="country"
              v-bind="countryAttrs"
              :placeholder="`${t('Country')} *`"
              :class="{ 'is-danger': errors.country }"
            />
            <p
              v-if="errors.country"
              class="has-text-danger"
            >
              {{ errors.country }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
