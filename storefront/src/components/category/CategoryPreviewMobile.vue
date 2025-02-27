<script setup lang="ts">
import Item from '@/components/item/Item.vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useItemStore } from '@/stores/ItemStore'
import { useLoader } from '@/composables/useLoader'
import { onMounted, computed } from 'vue'
import ItemSkeleton from '@/components/item/ItemSkeleton.vue'
import type { ICategory } from '@/interfaces/ICategory'

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

    <swiper
      :slidesPerView="1.2"
      :space-between="30"
    >
      <template v-if="loading">
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
      v-if="!loading && items.length === 0"
      class=""
    >
      Nothing found
    </p>
  </div>
</template>

<style scoped lang="scss"></style>
