<script setup lang="ts">
const input = defineModel<number | string | undefined>('input', { required: true })
</script>

<template>
  <input
    class="input"
    v-model="input"
  />
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
