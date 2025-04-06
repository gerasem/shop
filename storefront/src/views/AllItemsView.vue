<script setup lang="ts">
import Text2Columns from '@/components/content/Text2Columns.vue'
import CategoriesNarrow from '@/components/category/CategoryTitleNarrow.vue'
import { onMounted } from 'vue'
import { useItemStore } from '@/stores/ItemStore'
import { useLoader } from '@/composables/useLoader'
import ItemSkeletonContainer from '@/components/item/ItemSkeletonGroup.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useSeoMeta } from '@unhead/vue'
import Title from '@/components/content/Title.vue'
import ItemContainer from '@/components/item/ItemContainer.vue'

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.getCategories()
  itemStore.getAllItems()
})

const itemStore = useItemStore()
const { loading } = useLoader()

useSeoMeta({
  title: 'All Items',
})
</script>

<template>
  <CategoriesNarrow />

  <div class="container is-fluid">
    <Title>All Items</Title>

    <ItemSkeletonContainer
      v-if="loading"
      :count="8"
    />

    <template v-else>
      <template
        v-for="category in itemStore.items"
        :key="category.category"
      >
        <h2 class="title is-3">{{ category.category }}</h2>

        <ItemContainer
          :items="category.products"
        />
      </template>
    </template>
  </div>

  <Text2Columns header="About us"
    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores expedita, maiores! Ab cum
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
