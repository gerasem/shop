<script setup lang="ts">
import CartItem from '@/components/cart/CartItem.vue'
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '@unhead/vue'
import { useLoaderStore } from '@/stores/LoaderStore'
import Header from '@/components/content/Header.vue'
import { useCartStore } from '@/stores/CartStore'
import { computed } from 'vue'
import CartSteps from '@/components/cart/CartSteps.vue'
import CartTotalPrices from '@/components/cart/CartTotalPrices.vue'
import Text2Columns from '@/components/content/Text2Columns.vue'

const cartStore = useCartStore()
const loaderStore = useLoaderStore()

const { t } = useI18n()

const items = computed(() => {
  const itemsInCart = cartStore.cart?.items
  return itemsInCart?.sort((a, b) => a.title.localeCompare(b.title))
})

useSeoMeta({
  title: 'Shopping Cart',
})
</script>

<template>
  <!--   <div
    v-if="loaderStore.isLoadingKey('addToCart')"
    class="skeleton"
  >
    <div class="skeleton-item"></div>
  </div> -->

  <main class="container is-fluid">
    <CartSteps />
    <div class="columns">
      <div class="column is-two-thirds">
        <Header :level="2">Shopping Cart</Header>

        <CartItem
          v-for="item in items"
          :key="item.id"
          :item="item"
        />

        <p v-if="!items?.length">{{ t('Shopping cart is empty') }}</p>
      </div>

      <div class="column is-one-third">
        <CartTotalPrices :button="{ name: 'Weiter', icon: 'bag', path: 'checkout' }" />
      </div>
    </div>
  </main>

  <Text2Columns header="How to buy?">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores expedita, maiores! Ab cum
    porro voluptates voluptatibus voluptatum. Adipisci architecto at, atque cumque deleniti eveniet
    exercitationem expedita, id illum iure, iusto maiores molestias nisi nobis non rerum suscipit
    tempora unde velit veniam veritatis voluptas voluptate. Adipisci delectus distinctio dolores
    iure maiores, nobis praesentium similique suscipit ullam voluptatum? Aliquid animi consectetur
    consequuntur earum est et labore minima nam odio quidem quis temporibus, ut vero. Ad alias amet
    asperiores assumenda consequatur culpa dignissimos, doloribus eos fugit, molestiae nam nemo non
    officiis quasi quidem repellendus repudiandae sapiente, ullam vero voluptatibus. Dolore neque
    quia ratione!
  </Text2Columns>
</template>

<style lang="scss" scoped></style>
