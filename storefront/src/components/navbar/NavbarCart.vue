<script setup lang="ts">
import BaseIcon from '@/components/media/BaseIcon.vue'
import { localePath } from '@/composables/localePath.ts'
</script>

<template>
  <RouterLink
    class="navbar__icon-link"
    :to="localePath('cart')"
  >
    <BaseIcon
      icon="bag"
      :width="24"
      :height="24"
    />
  </RouterLink>
</template>

<style lang="scss" scoped>
.navbar {
  &__icon-link {
    width: 24px;
    text-align: center;
    color: $color-icons;
  }
}
</style>
