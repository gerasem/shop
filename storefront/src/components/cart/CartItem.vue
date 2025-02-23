<script setup lang="ts">
import { localePath } from '@/composables/localePath'
import Icon from '@/components/media/Icon.vue'

defineProps<{
  item: Object
}>()

const deleteItemWithConfirm = (event: Event, itemId: string) => {}

const changeItemCount = (count: number, item) => {}
</script>

<template>
  <div class="cart__item is-flex">
    <RouterLink :to="localePath(`item`)">
      <div class="cart__image-container">
        <img
          v-if="true"
          :src="'https://placehold.co/400x400'"
          :alt="'item'"
          class="cart__image is-block"
        />
      </div>
    </RouterLink>

    <div class="cart__main">
      <div class="cart__prices is-flex">
        <div
          class="cart__price"
          v-if="true"
        >
          {{ 1100 }}
          <span>x {{ 1 }}</span>
          {{ 1100 }}
        </div>

        <div
          class="cart__old-price"
          v-if="true"
        >
          {{ 1200 }}
        </div>

        <div
          class="cart__discount"
          v-if="false"
        >
          %
        </div>
      </div>

      <h4 class="cart__title">Item 123</h4>
    </div>

    <input
      class="input"
      style="width: 100px"
      type="text"
      placeholder="Text input"
    />

    <Icon
      :width="25"
      :height="25"
      icon="x-lg"
      @click="deleteItemWithConfirm($event, 1)"
    />
  </div>
</template>

<style scoped lang="scss">
.cart {
  &__item {
    align-items: center;
    padding: 1rem 1rem 1rem 0;
    position: relative;
    user-select: none;

    &:not(:last-of-type):after {
      position: absolute;
      content: '';
      width: calc(100% - 2rem);
      left: 1rem;
      bottom: 0;
      height: 1px;
      background: $background-gray;
    }
  }

  &__image-container {
    overflow: hidden;
  }

  &__image {
    width: 200px;
    height: 150px;
    object-fit: cover;
    background-color: $background-gray;
    transition: 0.2s;

    @media (max-width: $screen-lg-max) {
      width: 130px;
      height: 100px;
    }

    @media (max-width: $screen-md-max) {
      width: 100px;
      height: 75px;
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  &__button {
    cursor: pointer;
    margin-top: 2rem;
  }

  &__main {
    flex: 1;
    margin: 0 2rem;
  }

  &__price {
    font-size: 1.125rem;
    font-weight: 600;

    span {
      font-weight: 400;
      font-size: 1rem;
      margin: 0 20px;
    }
  }

  &__old-price {
    text-decoration: line-through;
    margin: 0 2rem;
  }

  &__discount {
    color: $color-primary;
  }

  &__title {
    font-size: 1rem;
  }

  &__actions {
    align-items: center;
  }
}
</style>
