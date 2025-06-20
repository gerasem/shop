<script setup lang="ts">
import Icon from '@/components/media/Icon.vue'
import { localePath } from '@/composables/localePath.ts'
import { useCartStore } from '@/stores/CartStore'
import { computed } from 'vue'
import { convertToLocale } from '@/utils/priceUtils'
import { useLoaderStore } from '@/stores/LoaderStore'

const cartStore = useCartStore()
const loaderStore = useLoaderStore()

const countOfItems = computed(() => {
  return cartStore.cart?.items?.length
})
</script>

<template>
  <RouterLink
    class="navbar__icon-link"
    :to="localePath('cart')"
    :title="convertToLocale({ amount: cartStore.cart?.total ?? 0 })"
  >
    <figure
      v-if="loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ADD_TO_CART)"
      class="image is-24x24 is-skeleton"
    ></figure>

    <Icon
      v-else
      icon="bag"
      :width="24"
      :height="24"
      class="navbar__cart-icon"
      :class="{ active: countOfItems }"
    />

    <span
      v-if="countOfItems && !loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ADD_TO_CART)"
      class="navbar__count"
      >{{ countOfItems }}</span
    >

    <figure
      v-else
      class="image is-16x16 is-skeleton"
    ></figure>
  </RouterLink>
</template>

<style lang="scss" scoped>
.navbar {
  &__icon-link {
    text-align: center;
    color: $color-icons;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__count {
    color: $color-text;
  }

  &__cart-icon {
    margin-top: -4px;

    &.active {
      color: $color-primary;
    }
  }
}
</style>
