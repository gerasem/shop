<script setup lang="ts">
defineProps<{
  icon?: string
  required?: boolean
}>()

const input = defineModel<number | string | undefined>('input', { required: true })
</script>

<template>
  <input
    class="input"
    :class="{ 'is-danger': required && $refs.input?.matches(':invalid') }"
    v-model="input"
    :required="required"
  />
</template>

<style lang="scss" scoped>
.input {
  &:invalid {
    border-color: red !important;
  }
}
</style>
