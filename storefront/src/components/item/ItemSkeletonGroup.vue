<script setup lang="ts">
import ItemSkeleton from '@/components/item/ItemSkeleton.vue'

defineProps<{
  count: number
}>()
</script>

<template>
  <div class="columns is-mobile is-multiline is-3">
    <div
      v-for="skeleton in count"
      :key="skeleton"
      class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop"
    >
      <ItemSkeleton />
    </div>
  </div>
</template>

<style scoped></style>
