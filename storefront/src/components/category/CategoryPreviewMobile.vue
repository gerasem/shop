<script setup lang="ts">
import Item from '@/components/item/Item.vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import type { ICategory } from '@/interfaces/ICategory.ts'
import { useItemStore } from '@/stores/ItemStore'
import { useLoader } from '@/composables/useLoader'
import { onMounted, computed } from 'vue'
import ItemSkeleton from '@/components/item/ItemSkeleton.vue'

const props = defineProps<{
  category: ICategory
}>()

onMounted(() => {
  itemStore.getItemsForMainPage(props.category.slug, 4)
})

const itemStore = useItemStore()
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

      <RouterLink
        :to="`category/${category.slug}`"
        class="title__link"
      >
        {{ t('Show all Tests') }}
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
