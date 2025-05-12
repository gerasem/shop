<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <div class="title__container">
    <h1
      class="title is-2"
      :class="{ 'is-skeleton': loading }"
    >
      <span v-if="loading">Title</span>
      <slot></slot>
    </h1>
  </div>
</template>

<style scoped lang="scss"></style>
