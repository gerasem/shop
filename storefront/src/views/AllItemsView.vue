<script setup lang="ts">
import Text2Columns from '@/components/content/Text2Columns.vue'
import CategoryTitleNarrow from '@/components/category/CategoryTitleNarrow.vue'
import { onMounted } from 'vue'
import { useItemStore } from '@/stores/ItemStore'
import ItemSkeletonContainer from '@/components/item/ItemSkeletonGroup.vue'
import { useSeoMeta } from '@unhead/vue'
import Title from '@/components/content/Title.vue'
import ItemContainer from '@/components/item/ItemContainer.vue'
import { useLoaderStore } from '@/stores/LoaderStore'

onMounted(async () => {
  await itemStore.getAllItems()
})

const itemStore = useItemStore()
const loaderStore = useLoaderStore()

useSeoMeta({
  title: 'All Items',
})
</script>

<template>
  <CategoryTitleNarrow />

  <div class="container is-fluid">
    <Title>All Items</Title>

    <ItemSkeletonContainer
      v-if="loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ITEMS)"
      :count="8"
    />

    <template v-else>
      <template
        v-for="category in itemStore.items"
        :key="category.category"
      >
        <h2 class="title is-3">{{ category.category }}</h2>

        <ItemContainer :items="category.products" :loading="!loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ITEMS)"/>
      </template>
    </template>
  </div>

  <Text2Columns header="About us">
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

<style scoped lang="scss"></style>
