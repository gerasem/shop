<script setup lang="ts">
import BreadcrumbItem from '@/components/breadcrumb/BreadcrumbItem.vue'
import Gallery from '@/components/gallery/Gallery.vue'
import Button from '@/components/button/Button.vue'
import Text2Columns from '@/components/content/Text2Columns.vue'
import CategoriesNarrow from '@/components/category/CategoryTitleNarrow.vue'
import { useMeta } from '@/composables/useMeta.ts'
import { onMounted, watch } from 'vue'
import { useLoader } from '@/composables/useLoader'
import { useItemStore } from '@/stores/ItemStore'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useRoute } from 'vue-router'

onMounted(() => {
  categoryStore.fetchCategories().then(() => {
    init(route.params.handle as string)
  })
})

const route = useRoute()
const categoryStore = useCategoryStore()
const itemStore = useItemStore()
const { loading } = useLoader()

const init = (slug: string): void => {
  itemStore.getItemBySlug(slug)
  categoryStore.setCurrentCategory('electronics')
  if (itemStore.currentItem) {
    useMeta(itemStore.currentItem.name)
  }
}

watch(
  () => route.params.handle,
  (newHandle) => {
    init(newHandle as string)
  },
)
</script>

<template>
  <CategoriesNarrow />

  <div class="container is-fluid">
    <BreadcrumbItem />

    <div class="columns is-mobile is-5-tablet is-6-desktop is-8-fullhd">
      <div class="column is-half">
        <Gallery />
      </div>

      <div class="column is-half">
        <div class="title__container">
          <h1
            v-if="itemStore.currentItem"
            class="title is-2"
          >
            {{ itemStore.currentItem?.title }}
          </h1>

          <h1
            v-else
            class="title is-2 is-skeleton"
          >
            Item
          </h1>
        </div>

        <Button icon="bag">Add to Cart</Button>
      </div>
    </div>
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
