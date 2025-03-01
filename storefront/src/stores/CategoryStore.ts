import { defineStore } from 'pinia'
import { ref } from 'vue'
import { sdk } from '@/services/medusa/config'
import type { ICategory } from '@/interfaces/ICategory'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<ICategory[]>([])
  const currentCategory = ref<ICategory | null>(null)

  const fetchCategories = async () => {
    if (categories.value.length) {
      return
    }

    await sdk.store.category.list()
      .then(({ product_categories }) => {
        categories.value = product_categories.map((product) => ({
          ...product,
          image: `https://placehold.co/200?text=${product.name}`,
        }))
        console.log(product_categories)
      })

    console.log('fetchCategories()')
  }

  const setCurrentCategory = (hanlde: string) => {
    console.log('setCurrentCategory()', categories.value)
    //todo redirect 404 if category not found
    if (!categories.value.length) return
    currentCategory.value = categories.value.find((cat: ICategory) => cat.handle === hanlde) || null
  }

  return { categories, fetchCategories, currentCategory, setCurrentCategory }
})
