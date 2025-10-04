import { useCategoryStore } from '@/stores/CategoryStore'
import { useCartStore } from '@/stores/CartStore'

export const init = async () => {
  const categoryStore = useCategoryStore()
  const cartStore = useCartStore()

  await categoryStore.getCategories()
  await cartStore.initializeCart()
}
