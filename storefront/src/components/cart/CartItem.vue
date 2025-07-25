<script setup lang="ts">
import { localePath } from '@/composables/localePath'
import Button from '@/components/form/Button.vue'
import { HttpTypes } from '@medusajs/types'
import { convertToLocale } from '@/utils/priceUtils'
import CartQuantity from '@/components/cart/CartQuantity.vue'
import { computed, ref, watch } from 'vue'
import { useCartStore } from '@/stores/CartStore'
import debounce from 'lodash.debounce'

const props = defineProps<{
  item: HttpTypes.StoreCartLineItem
}>()
const cartStore = useCartStore()

const inventoryQuantityFromApi = ref<number | null>(null)

const quantity = defineModel<number>('quantity', { default: 1 })
quantity.value = props.item.quantity

const deleteItem = () => {
  cartStore.removeItem(props.item)
}

const changeItemCount = async () => {
  console.log('changeItemCount', props.item.id, quantity.value)
  if (!quantityError.value) {
    cartStore.updateItemQuantity(props.item.id, quantity.value)
  }

  console.log('props.item.variant_id', props.item.product_id, props.item.variant_id)
  if (props.item?.product_id && props.item.variant_id) {
    inventoryQuantityFromApi.value = await cartStore.getItemQuantity(
      props.item?.product_id,
      props.item.variant_id,
    )
  }
}

const inventoryQuantity = computed(() => {
  if (props.item.variant?.allow_backorder || !props.item.variant?.manage_inventory) {
    return 1000
  }

  if (inventoryQuantityFromApi.value !== null) {
    return inventoryQuantityFromApi.value
  }
  return 1000
})

const quantityError = computed(() => {
  if (props.item.variant?.allow_backorder || !props.item.variant?.manage_inventory) {
    return false
  }

  return quantity?.value > inventoryQuantity.value
})

watch(
  quantity,
  debounce(() => {
    console.log('changeItemCount debounce')
    changeItemCount()
  }, 500),
)
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
          {{ convertToLocale({ amount: item.unit_price }) }}
          <span>x {{ item.quantity }}</span>
          <template v-if="item.total">
            {{ convertToLocale({ amount: item.total }) }}
          </template>

          <template v-else>
            {{ convertToLocale({ amount: item.unit_price * item.quantity }) }}
          </template>
        </div>

        <!-- <div
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
        </div> -->
      </div>

      <h4 class="cart__title">{{ item.product_title }} : {{ item.title }}</h4>
    </div>

    <CartQuantity
      v-model:quantity="quantity"
      :inventoryQuantity="inventoryQuantity"
      :quantityError="quantityError"
    />

    <Button
      class="is-white"
      icon="x-lg"
      @click="deleteItem()"
    ></Button>
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
