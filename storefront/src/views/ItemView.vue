<script setup lang="ts">
import BreadcrumbItem from '@/components/breadcrumb/BreadcrumbItem.vue'
import Gallery from '@/components/gallery/Gallery.vue'
import Title from '@/components/content/Title.vue'
import Button from '@/components/button/Button.vue'
import Text2Columns from '@/components/content/Text2Columns.vue'
import CategoryTitleNarrow from '@/components/category/CategoryTitleNarrow.vue'
import { watch, ref, computed } from 'vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { HttpTypes } from '@medusajs/types'
import ApiService from '@/services/api/api'
import { useLoaderStore } from '@/stores/LoaderStore'
import { useI18n } from 'vue-i18n'
import { useProductPrice } from '@/composables/useProductPrice'

const { getProductPrice } = useProductPrice()

const item = ref<HttpTypes.StoreProduct | null>(null)
const { t } = useI18n()

const route = useRoute()
const categoryStore = useCategoryStore()
const loaderStore = useLoaderStore()

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

const cheapestPrice = computed(() => {
  if (!item.value) {
    return null
  }
  const { cheapestPrice } = getProductPrice({
    product: item.value as HttpTypes.StoreProduct,
  })
  return cheapestPrice
})

useSeoMeta({
  title: item.value?.title,
})
</script>

<template>
  <CategoryTitleNarrow />

  <div class="container is-fluid">
    <BreadcrumbItem :loading="loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ITEM)" />

    <div class="columns is-mobile is-5-tablet is-6-desktop is-8-fullhd">
      <div class="column is-half">
        <Gallery
          v-if="item"
          :item="item"
        />
      </div>

      <div class="column is-half">
        <Title :loading="loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ITEM)">
          {{ item?.title }}
        </Title>

        <h3
          v-if="loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ITEM)"
          class="title is-4 has-skeleton"
        >
          Price
        </h3>

        <h3
          v-if="cheapestPrice"
          :loading="loaderStore.isLoadingKey(loaderStore.LOADER_KEYS.ITEM)"
          class="title is-3"
        >
          {{ t('from') }}
          {{ cheapestPrice.calculated_price }}
        </h3>

        <Button icon="bag">Add to Cart</Button>
      </div>
    </div>
  </div>

  <Text2Columns v-if="item">
    {{ item.description }}
  </Text2Columns>
</template>

<style scoped lang="scss"></style>
