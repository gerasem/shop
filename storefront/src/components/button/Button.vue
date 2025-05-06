<script setup lang="ts">
import Icon from '@/components/media/Icon.vue'

defineProps<{
  icon?: string
  disabled?: boolean
}>()
</script>

<template>
  <button
    class="button"
    :disabled="disabled"
  >
    <Icon
      v-if="icon"
      :icon="icon"
      :width="16"
      :height="16"
    />

    <span class="px-2">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
@forward 'bulma/sass/elements/button';
</style>
