<script setup lang="ts">
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { onMounted, onUnmounted, ref } from "vue";

//@ts-ignore
let lightbox = ref<null | PhotoSwipeLightbox>(null);

const imagesData = [
  {
    largeURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-2500.jpg",
    thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/1/img-200.jpg",
    width: 1875,
    height: 2500,
  },
  {
    largeURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
    thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg",
    width: 1669,
    height: 2500,
  },
  {
    largeURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg",
    thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg",
    width: 2500,
    height: 1666,
  },
  {
    largeURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
    thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg",
    width: 1669,
    height: 2500,
  },
  {
    largeURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg",
    thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg",
    width: 2500,
    height: 1666,
  },
  {
    largeURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg",
    thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg",
    width: 1669,
    height: 2500,
  },
  {
    largeURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg",
    thumbnailURL: "https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg",
    width: 2500,
    height: 1666,
  },
];

onMounted(() => {
  if (!lightbox.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.value.init();
  }
});

onUnmounted(() => {
  if (lightbox.value) {
    lightbox.value.destroy();
    lightbox.value = null;
  }
});
</script>

<template>
  <div id="gallery" class="gallery">
    <a
      v-for="(image, key) in imagesData"
      :key="key"
      :href="image.largeURL"
      :data-pswp-width="image.width"
      :data-pswp-height="image.height"
      target="_blank"
      rel="noreferrer"
    >
      <img :src="image.thumbnailURL" alt="" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.gallery {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
</style>
