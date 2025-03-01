import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '@/services/api2/api'
import type { ICategory } from '@/interfaces/ICategory'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<ICategory[]>([])
  const currentCategory = ref<ICategory | null>(null)

  const fetchCategories = async () => {
    if (categories.value.length) {
      return
    }

    categories.value = await ApiService.getCategories() as ICategory[]
  }

  const setCurrentCategory = (hanlde: string) => {
    console.log('setCurrentCategory()', categories.value)
    //todo redirect 404 if category not found
    if (!categories.value.length) return
    currentCategory.value = categories.value.find((cat: ICategory) => cat.handle === hanlde) || null
  }

  return { categories, fetchCategories, currentCategory, setCurrentCategory }
})
