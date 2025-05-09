<script setup lang="ts">
import ItemContainer from '@/components/item/ItemContainer.vue'
import { useItemStore } from '@/stores/ItemStore'
import { computed, onMounted } from 'vue'
import type { ICategory } from '@/interfaces/ICategory'
import ItemSkeletonContainer from '@/components/item/ItemSkeletonGroup.vue'
import CategoryPreviewHeader from '@/components/category/CategoryPreviewHeader.vue'
import { useLoaderStore } from '@/stores/LoaderStore'
const props = defineProps<{
  category: ICategory
}>()

onMounted(() => {
  itemStore.getItemsForMainPage(props.category, 4)
})

const itemStore = useItemStore()
const loaderStore = useLoaderStore()

const items = computed(() => {
  return itemStore.itemsByCategoryForMainPage(props.category.handle)
})
</script>

<template>
  <div class="category__preview-container">
    <CategoryPreviewHeader :category="category" />

    <ItemSkeletonContainer
      v-if="loaderStore.isLoadingKey('items-on-main')"
      :count="4"
    />

    <ItemContainer
      v-else
      :loading="!loaderStore.isLoadingKey('items-on-main')"
      :items="items"
    />
  </div>
</template>

<style scoped lang="scss"></style>
