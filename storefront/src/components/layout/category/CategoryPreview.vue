<script setup lang="ts">
import Item from '@/components/item/Item.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="category__preview-container">
    <div class="category__title-container">
      <h2 class="title is-2">Test</h2>

      <RouterLink to="#" class="category__title-link">{{ t('Show all Tests') }}</RouterLink>
    </div>

    <div class="columns is-multiline is-3">
      <div class="column is-half is-one-quarter-desktop" v-for="item in 4" :key="item">
        <Item />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category {
  &__preview-container {
    margin-bottom: 2rem;
  }

  &__title-container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  &__title-link {
    color: $color-text;
  }
}
</style>
