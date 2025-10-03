<script setup lang="ts">
defineProps<{
  icon?: string
}>()

const input = defineModel<number | string | undefined>('input', { required: true })
</script>

<template>
  <input
    class="input"
    v-model="input"
  />
</template>

<style lang="scss" scoped></style>
