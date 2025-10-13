<script setup lang="ts">
import Input from '@/components/form/Input.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const email = defineModel<string>('email', { required: true })
</script>

<template>
  <div class="columns">
    <div class="column is-half">
      <Input
        v-model:input="email"
        :label="t('Email')"
        name="email"
        type="email"
        required
      />
    </div>
  </div>
</template>

<style scoped></style>
