<script setup lang="ts">
import Item from '@/components/item/Item.vue'
import { useI18n } from 'vue-i18n'
import type { ICategory } from '@/interfaces/ICategory.ts'

defineProps<{
  category: ICategory
}>()
const { t } = useI18n()
</script>

<template>
  <div class="category__preview-container">
    <div class="title__container">
      <h2 class="title is-2">{{category.title}}</h2>

      <RouterLink :to="`catalog/${category.slug}`" class="title__link">{{ t('Show all Tests') }}</RouterLink>
    </div>

    <div class="columns is-mobile is-multiline is-3">
      <div class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd" v-for="item in 4" :key="item">
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
}
</style>
