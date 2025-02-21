<script setup lang="ts">
  import Item from '@/components/item/Item.vue'
  import type { ICategory } from '@/interfaces/ICategory.ts'
  import { useItemStore } from '@/stores/ItemStore';
  import { useLoader } from '@/composables/useLoader'
  import { computed, onMounted } from 'vue'
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

  const items = computed(() => {
    return itemStore.itemsByCategoryForMainPage(props.category.slug)
  })
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

    <div v-if="loading" class="columns is-mobile is-multiline is-3">
      <div v-for="skeleton in 4" :key="skeleton"
        class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd">
        <figure class="image is-square is-skeleton">
        </figure>
        <div class="category__skeleton-lines skeleton-lines">
          <div></div>
        </div>
      </div>
    </div>

    <div v-else class="columns is-mobile is-multiline is-3">
      <div class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
        v-for="item in items" :key="item.id">
        <Item :item="item" />
      </div>

      <p v-if="items.length === 0" class="column">Nothing found</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  
</style>
