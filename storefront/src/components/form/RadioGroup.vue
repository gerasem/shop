<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  modelValue: string
  name: string
  items: { name: string; value: string }[]
  required?: boolean
  label?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="field">
    <label
      v-if="label"
      class="label"
      >{{ t(label) }}</label
    >
    <div class="control">
      <div class="radio-group">
        <label
          v-for="(item, index) in items"
          :key="item.value"
          class="radio"
        >
          <input
            type="radio"
            :name="name"
            :value="item.value"
            :checked="modelValue === item.value"
            :required="required && index === 0"
            @change="$emit('update:modelValue', item.value)"
          />
          {{ t(item.name) }}
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.radio input[type='radio'] {
  margin-right: 0.5rem;
}

.radio input[type='radio']:focus {
  outline: none;
  box-shadow: 0 0 0 0.125em rgba($color-primary, 0.25);
}

.radio input:invalid {
  border-color: $color-secondary;
}
</style>
