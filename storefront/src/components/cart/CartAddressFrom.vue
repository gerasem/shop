<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useForm } from 'vee-validate'
import { defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import Input from '@/components/form/Input.vue'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

const { t } = useI18n()
configure({
  generateMessage: (ctx) => {
    const field = t(ctx.field)
    return {
      required: t('field_required', { field }),
      email: t('invalid_email'),
      min: t('min_length', { field, length: ctx.rule.params[0] }),
    }[ctx.rule.name]
  },
})

interface IUser {
  firstname: string
  lastname: string
  mail: string
  street: string
  house: string
  city: string
  country: string
  zip: string
  phone: string
}

const { errors, defineField, meta } = useForm<IUser>({
  validationSchema: {
    firstname: 'required|min:2',
    lastname: 'required|min:2',
    mail: 'required|email',
    street: 'required',
    house: 'required',
    city: 'required',
    country: 'required',
    zip: 'required|min:4',
    phone: 'required|min:5',
  },
})

const [firstname, firstnameAttrs] = defineField('firstname')
const [lastname, lastnameAttrs] = defineField('lastname')
const [mail, mailAttrs] = defineField('mail')
const [street, streetAttrs] = defineField('street')
const [house, houseAttrs] = defineField('house')
const [city, cityAttrs] = defineField('city')
const [country, countryAttrs] = defineField('country')
const [zip, zipAttrs] = defineField('zip')
const [phone, phoneAttrs] = defineField('phone')

defineExpose({
  isValid: meta,
})
</script>

<template>
  <div class="columns">
    <div class="column is-half">
      <div class="field">
        <label class="label">{{ t('Firstname') }}</label>
        <div class="control">
          <Input
            v-model:input="firstname"
            v-bind="firstnameAttrs"
            :placeholder="t('Firstname')"
            :class="{ 'is-danger': errors.firstname }"
          />
          <p
            v-if="errors.firstname"
            class="error"
          >
            {{ errors.firstname }}
          </p>
        </div>
      </div>
    </div>

    <div class="column is-half">
      <div class="field">
        <label class="label">{{ t('Lastname') }}</label>
        <div class="control">
          <Input
            v-model:input="lastname"
            v-bind="lastnameAttrs"
            :placeholder="t('Lastname')"
            :class="{ 'is-danger': errors.lastname }"
          />
          <p
            v-if="errors.lastname"
            class="error"
          >
            {{ errors.lastname }}
          </p>
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
            v-model:input="mail"
            v-bind="mailAttrs"
            type="email"
            :placeholder="t('Email')"
            :class="{ 'is-danger': errors.mail }"
          />
          <p
            v-if="errors.mail"
            class="error"
          >
            {{ errors.mail }}
          </p>
        </div>
      </div>
    </div>

    <div class="column is-half">
      <div class="field">
        <label class="label">{{ t('Phone') }}</label>
        <div class="control">
          <Input
            v-model:input="phone"
            v-bind="phoneAttrs"
            type="tel"
            :placeholder="t('Phone')"
            :class="{ 'is-danger': errors.phone }"
          />
          <p
            v-if="errors.phone"
            class="error"
          >
            {{ errors.phone }}
          </p>
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
            v-model:input="street"
            v-bind="streetAttrs"
            :placeholder="t('Street')"
            :class="{ 'is-danger': errors.street }"
          />
          <p
            v-if="errors.street"
            class="error"
          >
            {{ errors.street }}
          </p>
        </div>
      </div>
    </div>

    <div class="column is-one-fifths">
      <div class="field">
        <label class="label">{{ t('House') }}</label>
        <div class="control">
          <Input
            v-model:input="house"
            v-bind="houseAttrs"
            :placeholder="t('House')"
            :class="{ 'is-danger': errors.house }"
          />
          <p
            v-if="errors.house"
            class="error"
          >
            {{ errors.house }}
          </p>
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
            v-model:input="zip"
            v-bind="zipAttrs"
            :placeholder="t('Zip Code')"
            :class="{ 'is-danger': errors.zip }"
          />
          <p
            v-if="errors.zip"
            class="error"
          >
            {{ errors.zip }}
          </p>
        </div>
      </div>
    </div>

    <div class="column is-three-fifths">
      <div class="field">
        <label class="label">{{ t('City') }}</label>
        <div class="control">
          <Input
            v-model:input="city"
            v-bind="cityAttrs"
            :placeholder="t('City')"
            :class="{ 'is-danger': errors.city }"
          />
          <p
            v-if="errors.city"
            class="error"
          >
            {{ errors.city }}
          </p>
        </div>
      </div>
    </div>

    <div class="column is-one-fifths">
      <div class="field">
        <label class="label">{{ t('Country') }}</label>
        <div class="control">
          <Input
            v-model:input="country"
            v-bind="countryAttrs"
            :placeholder="t('Country')"
            :class="{ 'is-danger': errors.country }"
          />
          <p
            v-if="errors.country"
            class="error"
          >
            {{ errors.country }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.field .error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
.input.is-danger {
  border-color: red;
}
.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}
</style>
