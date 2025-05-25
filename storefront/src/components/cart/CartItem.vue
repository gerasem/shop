<script setup lang="ts">
import { localePath } from '@/composables/localePath'
import Icon from '@/components/media/Icon.vue'
import { HttpTypes } from '@medusajs/types'
import { convertToLocale } from '@/utils/priceUtils'
import Input from '@/components/form/Input.vue'

defineProps<{
  item: HttpTypes.StoreCartLineItem
}>()

const deleteItemWithConfirm = () => {}

const changeItemCount = (count: number, item) => {}
</script>

<template>
  <div class="cart__item is-flex">
    <RouterLink :to="localePath(`item/${item.product_handle}`)">
      <div class="cart__image-container">
        <img
          :src="item.thumbnail"
          :alt="'item'"
          class="cart__image is-block"
        />
      </div>
    </RouterLink>

    <div class="cart__main">
      <div class="cart__prices is-flex">
        <div class="cart__price">
          {{ convertToLocale({ amount: item.unit_price ?? 0 }) }}
          <span>x {{ item.quantity }}</span>
          {{ convertToLocale({ amount: item.unit_price * item.quantity }) }}
        </div>

        <div
          v-if="false"
          class="cart__old-price"
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

      <h4 class="cart__title">{{ item.product_title }} : {{ item.title }}</h4>
    </div>

    <Input
      :value="item.quantity"
      class="cart__input"
      min="1"
      type="number"
    ></Input>

    <Icon
      :width="25"
      :height="25"
      icon="x-lg"
      @click="deleteItemWithConfirm()"
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

  &__input {
    width: 50px;
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
