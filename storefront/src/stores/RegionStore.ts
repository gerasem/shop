import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '@/services/api/api'
import { useLoaderStore } from '@/stores/LoaderStore'

export const useRegionStore = defineStore('region', () => {
  const loaderStore = useLoaderStore()

  const regionId = ref<string>(import.meta.env.VITE_DEFAULT_REGION_ID || '')

  const initRegions = async () => {
    const regionIdinLS = localStorage.getItem('region_id')

    if (regionIdinLS) {
      regionId.value = regionIdinLS
    } else {
      const regions = await ApiService.fetchRegions(loaderStore.LOADER_KEYS.REGIONS)

      if (regions[0].id) {
        localStorage.setItem('region_id', regions[0].id)
        regionId.value = regions[0].id
      } else console.error('Error: get regions from api')
    }
  }

  return {
    regionId,
    initRegions,
  }
})
