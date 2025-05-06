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
      Category
    </h1>

    <h1
      v-else
      class="title is-2"
    >
      <slot></slot>
    </h1>

    <!-- <div class="select">
      <select>
        <option>Select dropdown</option>
        <option>With options</option>
      </select>
    </div> -->
  </div>
</template>

<style scoped lang="scss"></style>
