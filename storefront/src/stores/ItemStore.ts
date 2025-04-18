import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IItem } from '@/interfaces/IItem'
import ApiService from '@/services/api/api'
import type { ICategory } from '@/interfaces/ICategory'
import { useCategoryStore } from '@/stores/CategoryStore'
import { HttpTypes } from '@medusajs/types'

export const useItemStore = defineStore('item', () => {
  const items = ref<IItem[]>([])
  const itemsOnMainPage = ref<IItem[]>([])
  const currentItem = ref<HttpTypes.StoreProduct | null>(null)

  const getItemsByCategory = async (category: ICategory) => {
    if (items.value.some((item) => item.category === category.handle)) return

    const products = await ApiService.fetchItemsByCategory(category.id)

    items.value.push({
      category: category.handle,
      products,
    })
  }

  const getItemsForMainPage = async (category: ICategory, limit?: number) => {
    if (itemsOnMainPage.value.some((item) => item.category === category.handle)) return

    const products = await ApiService.fetchItemsByCategory(category.id, limit)

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

  const getItemByHandle = async (handle: string) => {
    const product = await ApiService.fetchItemByHandle(handle)

    currentItem.value = product
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
    currentItem,
    itemsByCategoryForMainPage,
    getItemsByCategory,
    itemsByCategory,
    getAllItems,
    getItemsForMainPage,
    getItemByHandle,
  }
})
