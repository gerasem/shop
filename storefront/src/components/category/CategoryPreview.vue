<script setup lang="ts">
import Item from '@/components/item/Item.vue'
import type { ICategory } from '@/interfaces/ICategory.ts'
import { useItemStore } from '@/stores/ItemStore';
import { useLoader } from '@/composables/useLoader'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  category: ICategory
}>()

onMounted(() => {
  itemStore.getItemsForMainPage(props.category.slug, 4)
})

const itemStore = useItemStore();
const { loading } = useLoader()
const { t } = useI18n()

</script>

<template>
  <div class="category__preview-container">
    <div class="title__container">
      <h2 class="title is-2">{{ category.title }}</h2>

      <RouterLink :to="`catalog/${category.slug}`" class="title__link">
        {{ t('Show all') }}
        {{ category.title }}
      </RouterLink>
    </div>

    <div class="columns is-mobile is-multiline is-3">
      <div class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
        v-for="item in itemStore.itemsByCategoryForMainPage(category.slug)" :key="item.id">
        <Item :item="item" />
      </div>

      <p v-if="itemStore.itemsByCategoryForMainPage(category.slug).length === 0" class="column">Nothing found</p>
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
