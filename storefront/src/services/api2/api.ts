import { sdk } from '@/services/medusa/config'
import { useLoader } from '@/composables/useLoader'
import { useToastStore } from '@/stores/ToastStore'
import { HttpTypes } from '@medusajs/types'

const loader = useLoader()

const FIELDS_ITEM_LIST = 'id,title,handle,thumbnail,*categories,*variants'

class ApiService {
  static async handleRequest<T>(id: string, callback: () => Promise<T>): Promise<T> {
    try {
      loader.startLoading(id)
      return await callback()
    } catch (error: unknown) {
      const toastStore = useToastStore()

      if (error instanceof Error) {
        console.error('API Error:', error.message)
        toastStore.addError('API Error', error.message)
      } else {
        console.error('API Error:', error)
      }

      throw error
    } finally {
      loader.stopLoading(id)
    }
  }

  static async getCategories(): Promise<HttpTypes.StoreProductCategory[] | []> {
    return this.handleRequest('getCategories', async () => {
      const { product_categories } = await sdk.store.category.list()

      return product_categories.map((product) => ({
        ...product,
        image: `https://placehold.co/200?text=${product.name}`,
      }))
    })
  }

  static async getItemsByCategory(categoryId: string): Promise<HttpTypes.StoreProduct[] | []> {
    return this.handleRequest('getItemsByCategory', async () => {
      const { products } = await sdk.store.product.list({
        category_id: categoryId,
        fields: FIELDS_ITEM_LIST,
        region_id: 'reg_01JR3YZXEGWJ49X3CSPXY3HVS2',
      })
      return products
    })
  }
}

export default ApiService
