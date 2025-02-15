<script setup lang="ts">
import Footer from '@/components/footer/Footer.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import InformationBanner from '@/components/information-banner/InformationBanner.vue'
import { useMeta } from '@/composables/useMeta.ts'
import Item from '@/components/item/Item.vue'
import Text2Columns from '@/components/content/Text2Columns.vue'
import CategoriesNarrow from '@/components/category/CategoryTitleNarrow.vue'
import { useCategoryStore } from '@/stores/category'
import { useRoute } from 'vue-router'
import { onMounted, watch } from 'vue'
import Loader from '@/components/common/Loader.vue'

const route = useRoute()
const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.fetchCategories().then(() => {
    categoryStore.setCurrentCategory(route.params.slug as string)
    if (categoryStore.currentCategory) {
      useMeta(categoryStore.currentCategory?.title)
    }
  })
})

watch(
  () => route.params.slug,
  (newSlug) => {
    categoryStore.setCurrentCategory(newSlug as string)
  },
)
</script>

<template>
  <Loader />

  <InformationBanner />

  <Navbar />

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

    <div class="columns is-mobile is-multiline is-3">
      <div
        class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop"
        v-for="item in 40"
        :key="item"
      >
        <Item />
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

  <Footer />
</template>

<style scoped lang="scss"></style>
