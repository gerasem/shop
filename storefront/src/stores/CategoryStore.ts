import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '@/services/api/api'
import type { ICategory } from '@/interfaces/ICategory'
import { useRouter } from 'vue-router'

export const useCategoryStore = defineStore('category', () => {
  const router = useRouter()

  const categories = ref<ICategory[]>([])
  const currentCategory = ref<ICategory | null>(null)

  const getCategories = async () => {
    if (categories.value.length) {
      return
    }
    categories.value = await ApiService.fetchCategories()
  }

  const setCurrentCategory = (hanlde: string) => {
    if (!categories.value.length) return
    const findedCategory = categories.value.find((cat: ICategory) => cat.handle === hanlde)
    if (!findedCategory) {
      router.push({ name: '404' })
    } else {
      currentCategory.value = findedCategory
    }
  }

  return { categories, getCategories, currentCategory, setCurrentCategory }
})
