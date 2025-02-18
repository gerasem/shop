<script setup lang="ts">
import type { IItem } from '@/interfaces/IItem';

defineProps<{
  item: IItem
}>()
</script>

<template>
  <RouterLink :to="`item/${item.slug}`" class="item">
      <img class="image is-square item__image" :src="item.image" :alt="item.title" />

    <div class="item__bottom">
      <h3 class="item__title">{{ item.title }}</h3>

      <div class="item__price">{{ item.price }}€</div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.item {
  &__image {
    width: 100%;
    object-fit: cover;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    color: $color-text;
  }

  &__price {
    color: $color-text;
  }
}
</style>
