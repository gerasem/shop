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

  static async fetchCategories(): Promise<HttpTypes.StoreProductCategory[] | []> {
    return this.handleRequest('fetchCategories', async () => {
      const { product_categories } = await sdk.store.category.list()

      return product_categories.map((product) => ({
        ...product,
        image: `https://placehold.co/200?text=${product.name}`,
      }))
    })
  }

  static async fetchItemsByCategory(
    categoryId: string,
    limit: number = 50,
  ): Promise<HttpTypes.StoreProduct[] | []> {
    return this.handleRequest('fetchItemsByCategory', async () => {
      const { products } = await sdk.store.product.list({
        category_id: categoryId,
        region_id: 'reg_01JR3YZXEGWJ49X3CSPXY3HVS2',
        limit,
        fields: FIELDS_ITEM_LIST,
      })
      return products
    })
  }

  static async fetchItemByHandle(handle: string): Promise<HttpTypes.StoreProduct> {
    return this.handleRequest('fetchItemByHandle', async () => {
      const { products } = await sdk.store.product.list({
        handle,
        region_id: 'reg_01JR3YZXEGWJ49X3CSPXY3HVS2',
        fields: FIELDS_ITEM_LIST,
      })
      return products[0]
    })
  }
}

export default ApiService
