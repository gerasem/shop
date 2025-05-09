// stores/region.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '@/services/api/api'
import { HttpTypes } from '@medusajs/types'

export const useRegionStore = defineStore('region', () => {
  const regions = ref<HttpTypes.StoreRegion[]>([])
  const region = ref<HttpTypes.StoreRegion | null>(null)

  const fetchRegions = async () => {
    if (regions.value.length) {
      return
    }
    regions.value = await ApiService.fetchRegions()
  }

  const setRegion = (newRegion: HttpTypes.StoreRegion) => {
    region.value = newRegion
    if (newRegion) {
      localStorage.setItem('region_id', newRegion.id)
    }
  }

  const initRegions = async () => {
    await fetchRegions()
    const regionId = localStorage.getItem('region_id')
    if (!regionId) {
      if (regions.value.length) {
        region.value = regions.value[0]
      }
    } else {
      region.value = await ApiService.retriveSelectedRegion(regionId)
    }
  }

  return {
    regions,
    region,
    setRegion,
    initRegions
  }
})
