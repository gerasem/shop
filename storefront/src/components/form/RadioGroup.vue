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
      />
      {{ radio.name }}
    </label>
  </div>
</template>

<style lang="scss" scoped></style>
