<script setup lang="ts">
import ItemContainer from '@/components/item/ItemContainer.vue'
import { useItemStore } from '@/stores/ItemStore'
import { useLoader } from '@/composables/useLoader'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ICategory } from '@/interfaces/ICategory'
import ItemSkeletonContainer from '@/components/item/ItemSkeletonGroup.vue'

const props = defineProps<{
  category: ICategory
}>()

onMounted(() => {
  itemStore.getItemsForMainPage(props.category, 4)
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

    <ItemContainer
      v-else
      :items="items"
    />
  </div>
</template>

<style scoped lang="scss"></style>
