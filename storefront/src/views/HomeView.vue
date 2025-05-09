<script setup lang="ts">
import Text2Columns from '@/components/content/Text2Columns.vue'
import { useSeoMeta } from '@unhead/vue'
import CategoryCard from '@/components/category/CategoryCard.vue'
import CategoryPreview from '@/components/category/CategoryPreview.vue'
import CategoryTitleNarrow from '@/components/category/CategoryTitleNarrow.vue'
import { useDevice } from '@/composables/useDevice.ts'
import CategoryPreviewMobile from '@/components/category/CategoryPreviewMobile.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useLoaderStore } from '@/stores/LoaderStore'
import CategoryCardSkeleton from '@/components/category/CategoryCardSkeleton.vue'

const { isMobile } = useDevice()
const categoryStore = useCategoryStore()
const loaderStore = useLoaderStore()

useSeoMeta({
  title: 'Home',
})
</script>

<template>
  <template v-if="isMobile">
    <CategoryTitleNarrow />

    <div class="container is-fluid">
      <CategoryPreviewMobile
        v-for="category in categoryStore.categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </template>

  <template v-else>
    <div class="container is-fluid">
      <div class="columns is-5-tablet is-6-desktop is-8-fullhd">
        <div class="column is-one-third-tablet is-one-fifth-desktop">
          <template v-if="loaderStore.isLoadingKey('categories')">
            <CategoryCardSkeleton
              v-for="skeleton in 5"
              :key="skeleton"
            />
          </template>

          <template v-else>
            <CategoryCard
              v-for="category in categoryStore.categories"
              :key="category.id"
              :category="category"
            />
          </template>
        </div>

        <div class="column">
          <CategoryPreview
            v-for="category in categoryStore.categories"
            :key="category.id"
            :category="category"
          />
        </div>
      </div>
    </div>
  </template>

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

<style scoped lang="scss">
.category {
  &__preview-container {
    margin-bottom: 2rem;
  }
}
</style>
