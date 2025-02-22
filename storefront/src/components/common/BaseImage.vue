<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";

const props = defineProps<{
  src: string;
}>();

const imageName = computed(() => {
  const parts = props.src.split(".");
  return parts.length > 1 ? parts.slice(0, -1).join(".") : props.src;
});

const imageExtension = computed(() => {
  const parts = props.src.split(".");
  return parts.length > 1 ? parts.pop() : "";
});

const loadImage = defineAsyncComponent({
  loader: () => import(`@/assets/images/${imageName.value}.${imageExtension.value}`),
  errorComponent: defineAsyncComponent(() => import(`@/assets/icons/_default.svg`)),
});
</script>

<template>
  <component :is="loadImage" class="image" />
</template>

<style scoped lang="scss">
@forward "bulma/sass/elements/image";
</style>
