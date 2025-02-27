import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiService } from '@/services/api/api'
import type { IItem } from '@/interfaces/IItem'

export const useItemStore = defineStore('item', () => {
  const items = ref<{ category: string; products: IItem[] }[]>([])
  const itemsOnMainPage = ref<{ category: string; products: IItem[] }[]>([])
  const currentItem = ref<IItem | null>(null)

  const getItemsByCategory = async (categoryHandle: string) => {
    if (items.value.some((item) => item.category === categoryHandle)) return

    const data = await apiService.get<IItem[]>(`/products/category/${categoryHandle}`)

    items.value.push({
      category: categoryHandle,
      products: data.map((item: IItem) => ({
        slug: item.title.toLowerCase().replace(/\s+/g, '-'),
        ...item,
      })),
    })

    console.log('get items by category', items.value)
  }

  const getItemsForMainPage = async (categoryHandle: string, limit?: number) => {
    if (itemsOnMainPage.value.some((item) => item.category === categoryHandle)) return

    const endpoint = `/products/category/${categoryHandle}${limit ? `?limit=${limit}` : ''}`

    const data = await apiService.get<IItem[]>(endpoint)

    itemsOnMainPage.value.push({
      category: categoryHandle,
      products: data.map((item: IItem) => ({
        slug: item.title.toLowerCase().replace(/\s+/g, '-'),
        ...item,
      })),
    })

    console.log('get items by category', items.value)
  }

  const getAllItems = async () => {
    const data = await apiService.get<IItem[]>('/products')

    const groupedItems = data.reduce<Record<string, IItem[]>>((acc, item) => {
      const category = item.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push({
        slug: item.title.toLowerCase().replace(/\s+/g, '-'),
        ...item,
      })
      return acc
    }, {})

    items.value = Object.entries(groupedItems).map(([category, items]) => ({
      category,
      products: items,
    }))

    console.log('get all items', items.value)
  }

  const getItemBySlug = async (slug: string) => {
    const data = await apiService.get<IItem>('/products/1')

    currentItem.value = data
    console.log('getItemBySlug', currentItem.value)
  }

  const itemsByCategory = (categoryHandle: string) => {
    return items.value.find((item) => item.category === categoryHandle)?.products || []
  }

  const itemsByCategoryForMainPage = (categoryHandle: string) => {
    return itemsOnMainPage.value.find((item) => item.category === categoryHandle)?.products || []
  }

  const allItems = () => {
    console.log('ALL ITEMS', items.value || [])
    return items.value || []
  }

  return {
    items,
    itemsOnMainPage,
    currentItem,
    itemsByCategoryForMainPage,
    getItemsByCategory,
    itemsByCategory,
    getAllItems,
    allItems,
    getItemsForMainPage,
    getItemBySlug,
  }
})
