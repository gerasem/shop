<script setup lang="ts">
defineProps<{
  icon?: string
  disabled?: boolean
  modelValue: string | number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const updateInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>

<template>
  <input
    class="input"
    type="text"
    @input="updateInput"
    :value="modelValue"
  />
</template>

<style lang="scss" scoped></style>
