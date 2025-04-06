<script setup lang="ts">
import Item from '@/components/item/Item.vue'
import { useItemStore } from '@/stores/ItemStore'
import { useLoader } from '@/composables/useLoader'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import ItemSkeleton from '@/components/item/ItemSkeleton.vue'
import type { ICategory } from '@/interfaces/ICategory'
import ItemSkeletonContainer from '@/components/item/ItemSkeletonContainer.vue'

const props = defineProps<{
  category: ICategory
}>()

onMounted(() => {
  itemStore.getItemsForMainPage(props.category.handle, 4)
})

const itemStore = useItemStore()
const { loading } = useLoader()
const { t } = useI18n()

const items = computed(() => {
  return itemStore.itemsByCategoryForMainPage(props.category.handle)
})
</script>

<template>
  <div class="category__preview-container">
    <div class="title__container">
      <h2 class="title is-2">{{ category.name }}</h2>

      <RouterLink
        :to="`category/${category.handle}`"
        class="title__link"
      >
        {{ t('Show all') }}
        {{ category.name }}
      </RouterLink>
    </div>

    <ItemSkeletonContainer
      v-if="loading && items.length === 0"
      :count="4"
    />
    
    <div
      v-else
      class="columns is-mobile is-multiline is-3"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
      >
        <Item :item="item" />
      </div>

      <p
        v-if="!loading && items.length === 0"
        class="column"
      >
        Nothing found
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
