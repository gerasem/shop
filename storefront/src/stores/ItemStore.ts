import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IItem } from '@/interfaces/IItem'
import ApiService from '@/services/api/api'
import type { ICategory } from '@/interfaces/ICategory'
import { useCategoryStore } from '@/stores/CategoryStore'
import { HttpTypes } from '@medusajs/types'
import { useRegionStore } from '@/stores/RegionStore'

export const useItemStore = defineStore('item', () => {
  const items = ref<IItem[]>([])
  const itemsOnMainPage = ref<IItem[]>([])
  const { region } = useRegionStore()
  const regionId = region?.id
  if (!regionId) {
    throw new Error('Region ID is not available')
  }

  const getItemsByCategory = async (category: ICategory) => {
    if (items.value.some((item) => item.category === category.handle)) return

    const products = await ApiService.fetchItemsByCategory(category.id, regionId)

    items.value.push({
      category: category.handle,
      products,
    })
  }

  const getItemsForMainPage = async (category: ICategory, limit?: number) => {
    if (itemsOnMainPage.value.some((item) => item.category === category.handle)) return

    const products = await ApiService.fetchItemsByCategory(category.id, regionId, limit)

    itemsOnMainPage.value.push({
      category: category.handle,
      products,
    })
  }

  const getAllItems = async () => {
    const categoryStore = useCategoryStore()
    const store = useItemStore()

    for (const category of categoryStore.categories) {
      const exists = items.value.some((item) => item.category === category.handle)

      if (!exists) {
        await store.getItemsByCategory(category)
      }
    }
  }

  const itemsByCategory = (categoryHandle: string): HttpTypes.StoreProduct[] | [] => {
    return items.value.find((item) => item.category === categoryHandle)?.products || []
  }

  const itemsByCategoryForMainPage = (categoryHandle: string): HttpTypes.StoreProduct[] | [] => {
    return itemsOnMainPage.value.find((item) => item.category === categoryHandle)?.products || []
  }

  return {
    items,
    itemsOnMainPage,
    itemsByCategoryForMainPage,
    getItemsByCategory,
    itemsByCategory,
    getAllItems,
    getItemsForMainPage,
  }
})
