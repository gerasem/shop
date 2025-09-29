<script setup lang="ts">
import { defineRule, configure } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import Input from '@/components/form/Input.vue'

const { t } = useI18n()
defineRule('required', required)
defineRule('email', email)

configure({
  generateMessage: (ctx) => {
    const field = t(ctx.field)
    return {
      required: t('field_required', { field }),
      email: t('invalid_email'),
    }[ctx.rule.name]
  },
})

const { errors, defineField, validate, meta } = useForm<{
  mail: string
}>({
  validationSchema: {
    mail: 'required|email',
  },
})
const [mail, mailAttrs] = defineField('mail')

const phone = ref<string>('')

defineExpose({
  isValid: meta,
})
</script>

<template>
  <div class="columns">
    <div class="column is-half">
      <div class="field">
        <label class="label">{{ t('Email') }} <span>*</span></label>
        <div class="control">
          <Input
            v-model:input="mail"
            v-bind="mailAttrs"
            type="email"
            :placeholder="`${t('Email')} *`"
            :class="{ 'is-danger': errors.mail }"
          />
          <p
            v-if="errors.mail"
            class="has-text-danger	"
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
            type="tel"
            :placeholder="t('Phone')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
