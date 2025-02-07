<script setup lang="ts">
defineProps<{
  header?: string;
}>()
</script>

<template>
  <section class="section">
    <div class="container is-fullhd">
      <h2 class="title is-2">{{ header }}</h2>

      <p class="content text__paragraph text__paragraph--2-columns">
        <slot></slot>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.text {
  &__paragraph {
    &--2-columns {
      column-count: 2;
      column-gap: 50px;

      @media (max-width: $screen-md-max) {
        column-count: 1;
      }
    }
  }
}
</style>
