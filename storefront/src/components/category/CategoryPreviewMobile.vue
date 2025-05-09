<script setup lang="ts">
import Item from '@/components/item/Item.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useItemStore } from '@/stores/ItemStore'
import { useLoaderStore } from '@/stores/LoaderStore'
import { onMounted, computed } from 'vue'
import ItemSkeleton from '@/components/item/ItemSkeleton.vue'
import type { ICategory } from '@/interfaces/ICategory'
import CategoryPreviewHeader from '@/components/category/CategoryPreviewHeader.vue'

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

    <swiper
      :slidesPerView="1.2"
      :space-between="30"
    >
      <template v-if="loaderStore.isLoadingKey('items-on-main')">
        <swiper-slide
          v-for="skeleton in 2"
          :key="skeleton"
        >
          <ItemSkeleton />
        </swiper-slide>
      </template>

      <template v-else>
        <swiper-slide
          v-for="item in items"
          :key="item.id"
        >
          <Item :item="item" />
        </swiper-slide>
      </template>
    </swiper>

    <p
      v-if="!loaderStore.isLoadingKey('items-on-main') && items.length === 0"
      class=""
    >
      Nothing found
    </p>
  </div>
</template>

<style scoped lang="scss"></style>
