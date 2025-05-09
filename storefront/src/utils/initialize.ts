import { useCategoryStore } from '@/stores/CategoryStore'
import { useRegionStore } from '@/stores/RegionStore'

export const init = async () => {
  const categoryStore = useCategoryStore()
  const regionStore = useRegionStore()

  await Promise.all([categoryStore.getCategories(), regionStore.initRegions()])
}
