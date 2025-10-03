<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Input from '@/components/form/Input.vue'

const { t } = useI18n()

const email = defineModel<string>('email', { required: true })
</script>

<template>
  <div class="columns">
    <div class="column is-half">
      <div class="field">
        <label class="label">{{ t('Email') }} <span>*</span></label>
        <div class="control">
          <Input
            v-model:input="email"
            type="email"
            :placeholder="`${t('Email')} *`"
            required
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
