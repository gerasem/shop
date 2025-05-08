import { sdk } from '@/services/medusa/config'
import { useLoader } from '@/composables/useLoader'
import { useToastStore } from '@/stores/ToastStore'
import { HttpTypes } from '@medusajs/types'

const loader = useLoader()

const FIELDS_ITEM_LIST = 'id,title,handle,thumbnail,*categories,*variants'

class ApiService {
  protected static loaderId: number = 0

  protected static async handleRequest<T>(callback: () => Promise<T>): Promise<T> {
    try {
      loader.startLoading(this.loaderId)

      return await callback()
    } catch (error: unknown) {
      const toastStore = useToastStore()

      if (error instanceof Error) {
        console.error('API Error:', error.message)
        toastStore.addError('API Error', error.message)
      }

      throw error
    } finally {
      loader.stopLoading(this.loaderId)
      this.loaderId++
    }
  }

  static async fetchCategories(): Promise<HttpTypes.StoreProductCategory[] | []> {
    return this.handleRequest(async () => {
      const { product_categories } = await sdk.store.category.list()

      return product_categories.map((product) => ({
        ...product,
        image: `https://placehold.co/200?text=${product.name}`,
      }))
    })
  }

  static async fetchItemsByCategory(
    categoryId: string,
    regionId: string,
    limit: number = 50,
  ): Promise<HttpTypes.StoreProduct[] | []> {
    return this.handleRequest(async () => {
      const { products } = await sdk.store.product.list({
        category_id: categoryId,
        region_id: regionId,
        limit,
        fields: FIELDS_ITEM_LIST,
      })
      return products
    })
  }

  static async fetchItemByHandle(
    handle: string,
    regionId: string,
  ): Promise<HttpTypes.StoreProduct> {
    return this.handleRequest(async () => {
      const { products } = await sdk.store.product.list({
        handle,
        region_id: regionId,
        fields: FIELDS_ITEM_LIST,
      })
      return products[0]
    })
  }

  static async fetchRegions(): Promise<HttpTypes.StoreRegion[]> {
    return this.handleRequest(async () => {
      const { regions } = await sdk.store.region.list()
      return regions
    })
  }

  static async retriveSelectedRegion(regionId: string): Promise<HttpTypes.StoreRegion> {
    return this.handleRequest(async () => {
      const { region: dataRegion } = await sdk.store.region.retrieve(regionId)
      return dataRegion
    })
  }
}

export default ApiService
