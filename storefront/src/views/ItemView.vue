<script setup lang="ts">
import BreadcrumbItem from '@/components/breadcrumb/BreadcrumbItem.vue'
import ProductActions from '@/components/item-view/ProductActions.vue'
import Gallery from '@/components/gallery/Gallery.vue'
import Text2Columns from '@/components/content/Text2Columns.vue'
import CategoryTitleNarrow from '@/components/category/CategoryTitleNarrow.vue'
import { watch, ref, computed } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { HttpTypes } from '@medusajs/types'
import ApiService from '@/services/api/api'
import { useLoaderStore } from '@/stores/LoaderStore'
import Header from '@/components/content/Header.vue'

const categoryStore = useCategoryStore()
const loaderStore = useLoaderStore()

const item = ref<HttpTypes.StoreProduct | null>(null)

const route = useRoute()

watch(
  () => route.params.handle,
  async (newHandle) => {
    item.value = await ApiService.fetchItemByHandle(
      newHandle as string,
      loaderStore.LOADER_KEYS.ITEM,
    )
    if (item.value && item.value?.categories) {
      categoryStore.setCurrentCategory(item.value?.categories[0]?.handle)
    }
  },
  { immediate: true },
)

useSeoMeta({
  title: computed(() => item.value?.title),
})
</script>

<template>
  <CategoryTitleNarrow />

  <main class="container is-fluid">
    <BreadcrumbItem :loading="loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ITEM)" />

    <div class="columns is-mobile is-5-tablet is-6-desktop is-8-fullhd">
      <div class="column is-half">
        <Gallery
          :loading="loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ITEM)"
          :item="item"
        />
      </div>

      <div class="column is-half">
        <Header
          :level="1"
          :loading="loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ITEM)"
        >
          {{ item?.title }}
        </Header>

        <!-- Skelettons -->
        <div v-if="loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ITEM)">
          <Header
            :level="4"
            class="block has-skeleton"
          >
            Price
          </Header>

          <Header
            :level="2"
            class="block has-skeleton"
          >
            Add to Cart
          </Header>
        </div>

        <ProductActions
          v-if="item"
          :product="item"
        />
      </div>
    </div>
  </main>

  <Text2Columns v-if="item"> {{ item.description }} </Text2Columns>
</template>

<style scoped lang="scss"></style>
