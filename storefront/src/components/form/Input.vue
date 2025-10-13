<script setup lang="ts">
defineProps<{
  label: string
  name: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  type?: string
  loading?: boolean
}>()

const input = defineModel<number | string | undefined>('input', { required: true })
</script>

<template>
  <div class="field">
    <label
      :id="name"
      class="label"
      >{{ label }} <span v-if="required">*</span></label
    >
    <div class="control">
      <input
        class="input"
        :class="{'is-skeleton': loading}"
        v-model="input"
        :placeholder="placeholder ? placeholder : label"
        :name="name"
        :required="required"
        :type="type || 'text'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  &:invalid {
    border-color: var(--invalid-border-color);
  }

  &:invalid,
  &::placeholder {
    color: var(--invalid-placeholder-color);
  }
}
</style>
