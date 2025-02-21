<script setup lang="ts">
  import Item from '@/components/item/Item.vue'
  import { useI18n } from 'vue-i18n'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'
  import type { ICategory } from '@/interfaces/ICategory.ts'
  import { useItemStore } from '@/stores/ItemStore';
  import { useLoader } from '@/composables/useLoader'
  import { onMounted, computed } from 'vue'

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
        {{ t('Show all Tests') }}
      </RouterLink>
    </div>

    <swiper v-if="loading" :slidesPerView="1.2" :space-between="30">
      <swiper-slide v-for="skeleton in 2" :key="skeleton">
        <figure class="image is-square is-skeleton">
        </figure>
        <div class="category__skeleton-lines skeleton-lines">
          <div></div>
        </div>
      </swiper-slide>
    </swiper>

    <swiper v-else :slidesPerView="1.2" :space-between="30">
      <swiper-slide v-for="item in items" :key="item.id">
        <Item :item="item" />
      </swiper-slide>
    </swiper>
    <p v-if="items.length === 0" class="">Nothing found</p>

  </div>
</template>

<style scoped lang="scss"></style>
