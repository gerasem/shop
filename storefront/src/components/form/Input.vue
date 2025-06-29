<script setup lang="ts">
defineProps<{
  icon?: string
  disabled?: boolean
}>()

const input = defineModel<number | string>('input', { required: true })

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
    type="text"
    v-model="input"
  />
</template>

<style lang="scss" scoped></style>
