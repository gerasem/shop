import { defineStore } from 'pinia'
import { ref } from 'vue'
import { sdk } from '@/services/medusa/config'
import { HttpTypes } from "@medusajs/types"

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<HttpTypes.StoreProductCategory[]>([])
  const currentCategory = ref<HttpTypes.StoreProductCategory | null>(null)
  const isLoaded = ref<boolean>(false)

  const fetchCategories = async () => {
    if (categories.value.length) {
      return
    }

    sdk.store.category.list()
      .then(({ product_categories }) => {
        categories.value = product_categories.map((product) => ({
          ...product,
          image: `https://placehold.co/200?text=${product.name}`,
        }))
        console.log(product_categories)
      })

    console.log('fetchCategories()')
    isLoaded.value = true
  }

  const setCurrentCategory = (hanlde: string) => {
    console.log('setCurrentCategory()')
    //todo redirect 404 if category not found
    if (!categories.value.length) return
    currentCategory.value = categories.value.find((cat: HttpTypes.StoreProductCategory) => cat.handle === hanlde) || null
  }

  return { isLoaded, categories, fetchCategories, currentCategory, setCurrentCategory }
})
