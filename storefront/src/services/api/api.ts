import { sdk } from '@/services/medusa/config'
import { useToastStore } from '@/stores/ToastStore'
import { useLoaderStore } from '@/stores/LoaderStore'
import { HttpTypes } from '@medusajs/types'
import { useRegionStore } from '@/stores/RegionStore'

const FIELDS_ITEM_LIST = 'id,title,handle,thumbnail,*categories,*variants'

class ApiService {
  protected static async handleRequest<T>(
    callback: () => Promise<T>,
    options: { loaderKey?: string },
  ): Promise<T> {
    const loaderStore = useLoaderStore()
    const loaderKey = options.loaderKey || 'default'

    try {
      loaderStore.startLoading(loaderKey)

      return await callback()
    } catch (error: unknown) {
      const toastStore = useToastStore()

      if (error instanceof Error) {
        console.error('API Error:', error.message)
        toastStore.addError('API Error', error.message)
      }

      throw error
    } finally {
      loaderStore.stopLoading(loaderKey)
    }
  }

  static async fetchCategories(
    loaderKey: string = 'fetchCategories',
  ): Promise<HttpTypes.StoreProductCategory[] | []> {
    return this.handleRequest(
      async () => {
        console.log('FetchCategories start', loaderKey)
        const { product_categories } = await sdk.store.category.list()

        console.log('FetchCategories end', loaderKey)
        return product_categories.map((product) => ({
          ...product,
          image: `https://placehold.co/200?text=${product.name}`,
        }))
      },
      { loaderKey },
    )
  }

  static async fetchItemsByCategory(
    categoryId: string,
    loaderKey: string = 'fetchItemsByCategory',
    limit: number = 50,
  ): Promise<HttpTypes.StoreProduct[] | []> {
    const { regionId } = useRegionStore()

    return this.handleRequest(
      async () => {
        const { products } = await sdk.store.product.list({
          category_id: categoryId,
          region_id: regionId,
          limit,
          fields: FIELDS_ITEM_LIST,
        })
        return products
      },
      { loaderKey },
    )
  }

  static async fetchItemByHandle(
    handle: string,
    loaderKey: string = 'fetchItemByHandle',
  ): Promise<HttpTypes.StoreProduct> {
    const { regionId } = useRegionStore()

    return this.handleRequest(
      async () => {
        const { products } = await sdk.store.product.list({
          handle,
          region_id: regionId,
          fields: FIELDS_ITEM_LIST,
        })
        return products[0]
      },
      { loaderKey },
    )
  }

  static async fetchRegions(loaderKey: string = 'fetchRegions'): Promise<HttpTypes.StoreRegion[]> {
    return this.handleRequest(
      async () => {
        const { regions } = await sdk.store.region.list()
        return regions
      },
      { loaderKey },
    )
  }

  /*  static async retriveSelectedRegion(
    loaderKey: string = 'retriveSelectedRegion',
  ): Promise<HttpTypes.StoreRegion> {
    return this.handleRequest(
      async () => {
        const { region: dataRegion } = await sdk.store.region.retrieve(
          'reg_01JTKR6SBY5P705E73XMCH2CQ9',
        )
        return dataRegion
      },
      { loaderKey },
    )
  } */
}

export default ApiService
