import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IItem } from '@/interfaces/IItem'
import ApiService from '@/services/api2/api'
import type { ICategory } from '@/interfaces/ICategory'
import { useCategoryStore } from '@/stores/CategoryStore'

export const useItemStore = defineStore('item', () => {
  const items = ref<IItem[]>([])
  const itemsOnMainPage = ref<IItem[]>([])
  const currentItem = ref<IItem | null>(null)

  const getItemsByCategory = async (selectedCategory: ICategory | null) => {
    if (selectedCategory) {
      if (items.value.some((item) => item.category === selectedCategory.handle)) return

      const products = await ApiService.fetchItemsByCategory(selectedCategory.id)

      items.value.push({
        category: selectedCategory.handle,
        products: products,
      })
    }
  }

  const getItemsForMainPage = async (category: ICategory, limit?: number) => {
    if (itemsOnMainPage.value.some((item) => item.category === category.handle)) return

    const data = await ApiService.fetchItemsByCategory(category.id, limit)

    console.log('data', data)
    itemsOnMainPage.value.push({
      category: category.handle,
      products: data,
    })

    console.log('get items by category', itemsOnMainPage.value)
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

    console.log('get all items', items.value)
  }

  const getItemBySlug = async (slug: string) => {
    /* const data = await apiService.get<IItem>('/products/1')

    currentItem.value = data
    console.log('getItemBySlug', currentItem.value) */
  }

  const itemsByCategory = (categoryHandle: string) => {
    return items.value.find((item) => item.category === categoryHandle)?.products || []
  }

  const itemsByCategoryForMainPage = (categoryHandle: string) => {
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
    getItemBySlug,
  }
})
