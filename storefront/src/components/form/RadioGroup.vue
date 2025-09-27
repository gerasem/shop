<script setup lang="ts">
import { useId } from 'vue'

interface IRadio {
  name: string
  value: string
}

defineProps<{
  items: IRadio[]
}>()
const id = useId()

const input = defineModel<number | string | undefined>('input', { required: true })
</script>

<template>
  <div class="radios">
    <label
      v-for="radio in items"
      :key="radio.name"
      class="radio"
    >
      <input
        type="radio"
        :name="id"
        v-model="input"
      />
      {{ radio.name }}
    </label>
  </div>
</template>

<style lang="scss" scoped></style>
