<script setup lang="ts">
import Item from '@/components/item/Item.vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const { t } = useI18n()
</script>

<template>
  <div class="category__preview-container">
    <div class="title__container">
      <h2 class="title is-2">Test</h2>

      <RouterLink to="#" class="title__link">{{ t('Show all Tests') }}</RouterLink>
    </div>

      <swiper
        :slidesPerView="1.2"
        :space-between="30"
      >
        <swiper-slide v-for="item in 4" :key="item">
          <Item />
        </swiper-slide>
      </swiper>
  </div>
</template>

<style scoped lang="scss">
.category {
  &__preview-container {
    margin-bottom: 2rem;
  }
}
</style>
