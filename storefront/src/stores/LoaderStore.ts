import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLoaderStore = defineStore('loader', () => {
  const activeLoaders = ref(new Set<string>())

  const isLoading = computed(() => activeLoaders.value.size > 0)

  const isLoadingKey = (key: string) => activeLoaders.value.has(key)

  const startLoading = (key: string) => {
    activeLoaders.value.add(key)
    //console.log('startLoading', key)
  }

  const stopLoading = (key: string) => {
    activeLoaders.value.delete(key)
    //console.log('stopLoading', key)
  }

  const LOADER_KEYS = {
    CATEGORIES: 'CATEGORIES',
    ITEMS: 'ITEMS',
    ITEM: 'ITEM',
    ADD_TO_CART: 'ADD_TO_CART',
  }

  return { isLoading, isLoadingKey, startLoading, stopLoading, activeLoaders, LOADER_KEYS }
})
