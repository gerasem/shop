import { useCategoryStore } from '@/stores/CategoryStore'
import { useRegionStore } from '@/stores/RegionStore'
import { useCartStore } from '@/stores/CartStore'

export const init = async () => {
  const categoryStore = useCategoryStore()
  const regionStore = useRegionStore()
  const cartStore = useCartStore()

  await Promise.all([regionStore.initRegions(), categoryStore.getCategories()])
  console.log("init")
  cartStore.initializeCart()
}
