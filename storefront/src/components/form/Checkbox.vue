<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const modelValue = defineModel<boolean>({ required: true })

defineProps<{
  label?: string
  name?: string
  required?: boolean
  disabled?: boolean
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
      <label
        class="checkbox"
        :class="{ 'is-disabled': disabled }"
      >
        <input
          type="checkbox"
          :name="name"
          v-model="modelValue"
          :required="required"
          :disabled="disabled"
        />
        {{ t(label || 'Checkbox') }}
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:has(input:invalid) {
    color: var(--invalid-border-color);
  }
}
</style>
