<script setup lang="ts">
  import { useMeta } from '@/composables/useMeta.ts'
  import Item from '@/components/item/Item.vue'
  import Text2Columns from '@/components/content/Text2Columns.vue'
  import CategoriesNarrow from '@/components/category/CategoryTitleNarrow.vue'
  import { useCategoryStore } from '@/stores/CategoryStore'
  import { useRoute } from 'vue-router'
  import { onMounted, watch } from 'vue'
  import { useItemStore } from '@/stores/ItemStore';
  import { useLoader } from '@/composables/useLoader'

  onMounted((): void => {
    init(route.params.slug as string)
  })

  const route = useRoute()
  const categoryStore = useCategoryStore()
  const itemStore = useItemStore();
  const { loading } = useLoader()

  const init = (slug: string): void => {
    categoryStore.setCurrentCategory(slug)
    itemStore.getItemsByCategory(slug)
    if (categoryStore.currentCategory) {
      useMeta(categoryStore.currentCategory?.title)
    }
  }

  watch(
    [() => route.params.slug, () => categoryStore.isLoaded],
    ([newSlug, isLoaded]) => {
      if (isLoaded) {
        init(newSlug as string);
      }
    }
  )
</script>

<template>
  <CategoriesNarrow />

  <div class="container is-fluid">
    <div class="title__container">
      <h1 class="title is-2">{{ categoryStore.currentCategory?.title }}</h1>

      <div class="select">
        <select>
          <option>Select dropdown</option>
          <option>With options</option>
        </select>
      </div>
    </div>

    <div v-if="categoryStore.currentCategory" class="columns is-mobile is-multiline is-3">
      <div class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop"
        v-for="item in itemStore.itemsByCategory(categoryStore.currentCategory.slug)" :key="item.id">
        <Item :item="item" />
      </div>

      <p v-if="itemStore.itemsByCategory(categoryStore.currentCategory.slug).length === 0" class="column">Nothing found
      </p>
    </div>


  </div>

  <Text2Columns header="About us">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores expedita, maiores!
    Ab cum
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
