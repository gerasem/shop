<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <div class="title__container">
    <h1
      v-if="loading"
      class="title is-2 is-skeleton"
    >
      Title
    </h1>

    <h1
      v-else
      class="title is-2"
    >
      <slot></slot>
    </h1>

  </div>
</template>

<style scoped lang="scss"></style>
