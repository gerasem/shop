<script setup lang="ts">
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import { HttpTypes } from '@medusajs/types'

const props = defineProps<{
  item: HttpTypes.StoreProduct
}>()

const getImageSize = (url: string) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = url
    img.onload = () => {
      resolve({
        src: url,
        w: img.naturalWidth,
        h: img.naturalHeight,
      })
    }
  })
}

const openGallery = async (startIndex: number) => {
  if (!props.item.images) {
    return
  }
  const items = await Promise.all(props.item.images.map((img) => getImageSize(img.url)))

  const lightbox = new PhotoSwipeLightbox({
    dataSource: items,
    pswpModule: () => import('photoswipe'),
  })

  lightbox.init()
  lightbox.loadAndOpen(startIndex)
}
</script>

<template>
  <div
    id="gallery"
    class="gallery__row"
  >
    <template v-if="item.images">
      <a
        v-for="(image, key) in item.images"
        :key="key"
        href="#"
        target="_blank"
        rel="noreferrer"
        class="gallery__item"
        @click.prevent="openGallery(key)"
      >
        <img
          :src="image.url"
          :alt="`Image ${key + 1}`"
        />
      </a>
    </template>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;

  &__row {
    margin: 30px 30px 30px 0;
    column-count: 2;
    column-gap: 15px;
  }

  &__item {
    display: grid;
    grid-template-rows: 1fr auto;
    margin-bottom: 15px;
    break-inside: avoid;
    cursor: zoom-in;
  }
}
</style>
