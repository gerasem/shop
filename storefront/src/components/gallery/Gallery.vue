<script setup lang="ts">
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import { onMounted, onUnmounted, ref } from 'vue'
import { HttpTypes } from '@medusajs/types'

const lightbox = ref<null | PhotoSwipeLightbox>(null)

defineProps<{
  item: HttpTypes.StoreProduct
}>()

onMounted(() => {
  if (!lightbox.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: '#gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    })
    lightbox.value.init()
  }
})

onUnmounted(() => {
  if (lightbox.value) {
    lightbox.value.destroy()
    lightbox.value = null
  }
})
</script>

<template>
  <div
    id="gallery"
    class="gallery"
  >
    <template v-if="item.images">
      <a
        v-for="(image, key) in item.images"
        :key="key"
        :href="image.url"
        target="_blank"
        rel="noreferrer"
      >
        <img
          :src="image.url"
          alt=""
        /> </a
    ></template>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
</style>
