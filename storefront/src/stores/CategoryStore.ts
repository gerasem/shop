import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '@/services/api/api'
import type { ICategory } from '@/interfaces/ICategory'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<ICategory[]>([])
  const currentCategory = ref<ICategory | null>(null)

  const getCategories = async () => {
    if (categories.value.length) {
      return
    }

    categories.value = await ApiService.fetchCategories()
  }

  const setCurrentCategory = (hanlde: string) => {
    console.log('setCurrentCategory()', categories.value)
    //todo redirect 404 if category not found
    if (!categories.value.length) return
    currentCategory.value = categories.value.find((cat: ICategory) => cat.handle === hanlde) || null
  }

  return { categories, getCategories, currentCategory, setCurrentCategory }
})
