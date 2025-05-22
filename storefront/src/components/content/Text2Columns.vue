<script setup lang="ts">
import Header from '@/components/content/Header.vue'

defineProps<{
  header?: string
}>()
</script>

<template>
  <section class="section">
    <div class="container is-fullhd">
      <Header :level="2">{{ header }}</Header>

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
