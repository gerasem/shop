<script setup lang="ts">
import Item from '@/components/item/Item.vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import type { ICategory } from '@/interfaces/ICategory.ts'
import { useItemStore } from '@/stores/ItemStore';
import { useLoader } from '@/composables/useLoader'
import { onMounted } from 'vue'

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

      <RouterLink :to="`catalog/${category.slug}`" class="title__link">{{
        t('Show all Tests')
      }}</RouterLink>
    </div>

    <swiper :slidesPerView="1.2" :space-between="30">
      <swiper-slide v-for="item in itemStore.itemsByCategoryForMainPage(category.slug)" :key="item.id">
        <Item :item="item" />
      </swiper-slide>
    </swiper>
    <p v-if="itemStore.itemsByCategoryForMainPage(category.slug).length === 0" class="">Nothing found</p>

  </div>
</template>

<style scoped lang="scss">
.category {
  &__preview-container {
    margin-bottom: 2rem;
  }
}
</style>
