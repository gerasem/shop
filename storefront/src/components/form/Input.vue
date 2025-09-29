<script setup lang="ts">
defineProps<{
  icon?: string
  type?: string
}>()

const input = defineModel<number | string | undefined>('input', { required: true })

// const emit = defineEmits<{
//   (e: 'update:modelValue', value: string | number): void
// }>()

// const updateInput = (event: Event) => {
//   const input = event.target as HTMLInputElement
//   emit('update:modelValue', input.value)
// }
</script>

<template>
  <input
    class="input"
    :type="type || 'text'"
    v-model="input"
  />
</template>

<style lang="scss" scoped></style>
