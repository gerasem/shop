<script setup lang="ts">
import Text2Columns from '@/components/content/Text2Columns.vue'
import CategoriesNarrow from '@/components/category/CategoryTitleNarrow.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useRoute } from 'vue-router'
import { onMounted, watch, computed } from 'vue'
import { useItemStore } from '@/stores/ItemStore'
import ItemSkeletonContainer from '@/components/item/ItemSkeletonGroup.vue'
import { useSeoMeta } from '@unhead/vue'
import Title from '@/components/content/Title.vue'
import ItemContainer from '@/components/item/ItemContainer.vue'
import { useLoaderStore } from '@/stores/LoaderStore'

const loaderStore = useLoaderStore()


onMounted(async () => {
  init(route.params.handle as string)
})

const route = useRoute()
const categoryStore = useCategoryStore()
const itemStore = useItemStore()

const init = (handle: string): void => {
  categoryStore.setCurrentCategory(handle)
  if (categoryStore.currentCategory) {
    itemStore.getItemsByCategory(categoryStore.currentCategory)
  }
}

const items = computed(() => {
  if (categoryStore.currentCategory) {
    return itemStore.itemsByCategory(categoryStore.currentCategory.handle)
  }
  return []
})

watch(
  () => route.params.handle,
  (newHandle) => {
    init(newHandle as string)
  },
)

useSeoMeta({
  title: computed(() => (categoryStore.currentCategory ? categoryStore.currentCategory.name : '')),
})
</script>

<template>
  <CategoriesNarrow />

  <div class="container is-fluid">
    <Title :loading="loaderStore.isLoadingKey('categories')">
      {{ categoryStore.currentCategory?.name }}
    </Title>

    <ItemSkeletonContainer
      v-if="loaderStore.isLoadingKey('items')"
      :count="8"
    />

    <ItemContainer
      v-else
      :items="items"
      :loading="!loaderStore.isLoadingKey('items')"
    />
  </div>

  <Text2Columns header="About item">
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
