import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '@/services/api/api'
import type { ICategory } from '@/interfaces/ICategory'
import { useRouter } from 'vue-router'
import { useLoaderStore } from '@/stores/LoaderStore'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<ICategory[]>([])
  const currentCategory = ref<ICategory | null>(null)
  const router = useRouter()
  const loaderStore = useLoaderStore()

  const getCategories = async () => {
    if (categories.value.length) {
      return
    }
    categories.value = await ApiService.fetchCategories(loaderStore.LOADER_KEYS.CATEGORIES)
  }

  const setCurrentCategory = (handle: string) => {
    if (!categories.value.length) return
    const foundCategory = categories.value.find((cat: ICategory) => cat.handle === handle)

    if (!foundCategory) {
      router.push({ name: '404' })
    } else {
      currentCategory.value = foundCategory
    }
  }

  return { categories, getCategories, currentCategory, setCurrentCategory }
})
