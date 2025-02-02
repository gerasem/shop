<script setup lang="ts">
import Item from '@/components/item/Item.vue'
</script>

<template>
  <div class="category__preview-container">
    <h2 class="title is-2">Test</h2>

    <div class="columns is-multiline is-3">
      <div class="column is-half is-one-quarter-desktop" v-for="item in 4" :key="item">
        <Item />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category {
  &__preview-container{
    margin-bottom: 2rem;
  }
}
</style>
