import { sdk } from '@/services/medusa/config'
import { useToastStore } from '@/stores/ToastStore'
import { useLoaderStore } from '@/stores/LoaderStore'
import { HttpTypes } from '@medusajs/types'
import { useRegionStore } from '@/stores/RegionStore'

const CART_FIELDS =
  '*items,+items.total,*region,*items.product,*items.variant,*items.thumbnail,*items.metadata,*promotions,+shipping_methods.name'

class ApiService {
  static regionId = ''

  constructor() {
    ApiService.regionId = useRegionStore().regionId
  }

  protected static async handleRequest<T>(
    callback: () => Promise<T>,
    options: { loaderKey: string },
  ): Promise<T> {
    const loaderStore = useLoaderStore()

    try {
      loaderStore.startLoading(options.loaderKey)

      return await callback()
    } catch (error: unknown) {
      const toastStore = useToastStore()

      if (error instanceof Error) {
        console.error('API Error:', error.message)
        toastStore.addError('API Error', error.message)
      }

      throw error
    } finally {
      loaderStore.stopLoading(options.loaderKey)
    }
  }

  static async fetchCategories(loaderKey: string): Promise<HttpTypes.StoreProductCategory[] | []> {
    return this.handleRequest(
      async () => {
        const { product_categories } = await sdk.store.category.list()

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
    loaderKey: string,
    limit: number = 50,
  ): Promise<HttpTypes.StoreProduct[] | []> {
    return this.handleRequest(
      async () => {
        const { products } = await sdk.store.product.list({
          category_id: categoryId,
          region_id: this.regionId,
          limit,
          fields:
            'id,title,handle,thumbnail,*categories,*variants,+variants.calculated_price,+variants.inventory_quantity',
        })
        return products
      },
      { loaderKey },
    )
  }

  static async fetchItemByHandle(
    handle: string,
    loaderKey: string,
  ): Promise<HttpTypes.StoreProduct> {
    return this.handleRequest(
      async () => {
        const { products } = await sdk.store.product.list({
          handle,
          region_id: this.regionId,
          fields:
            '*categories,*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags',
        })
        return products[0]
      },
      { loaderKey },
    )
  }

  static async fetchRegions(loaderKey: string): Promise<HttpTypes.StoreRegion[]> {
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

  static async createCart(
    data: { region_id: string },
    loaderKey: string,
  ): Promise<HttpTypes.StoreCart> {
    return ApiService.handleRequest(
      async () => {
        const { cart } = await sdk.store.cart.create(data)
        return cart
      },
      { loaderKey },
    )
  }

  static async retrieveCart(cartId: string, loaderKey: string): Promise<HttpTypes.StoreCart> {
    return ApiService.handleRequest(
      async () => {
        const { cart } = await sdk.store.cart.retrieve(cartId, {
          fields: CART_FIELDS,
        })
        return cart
      },
      { loaderKey },
    )
  }

  static async updateCart(
    cartId: string,
    data: HttpTypes.StoreUpdateCart,
    loaderKey: string,
  ): Promise<HttpTypes.StoreCart> {
    return ApiService.handleRequest(
      async () => {
        const { cart } = await sdk.store.cart.update(cartId, data, {
          fields: CART_FIELDS,
        })
        return cart
      },
      { loaderKey },
    )
  }

  static async createCartLineItem(
    cartId: string,
    data: { variant_id: string; quantity: number },
    loaderKey: string,
  ): Promise<HttpTypes.StoreCart> {
    return ApiService.handleRequest(
      async () => {
        const { cart } = await sdk.store.cart.createLineItem(cartId, data, {
          fields: CART_FIELDS,
        })
        return cart
      },
      { loaderKey },
    )
  }

  static async updateCartLineItem(
    cartId: string,
    itemId: string,
    data: { quantity: number },
    loaderKey: string,
  ): Promise<HttpTypes.StoreCart> {
    return ApiService.handleRequest(
      async () => {
        const { cart } = await sdk.store.cart.updateLineItem(cartId, itemId, data, {
          fields: CART_FIELDS,
        })
        return cart
      },
      { loaderKey },
    )
  }

  static async addCartShippingMethod(
    cartId: string,
    data: HttpTypes.StoreAddCartShippingMethods,
    loaderKey: string,
  ): Promise<HttpTypes.StoreCart> {
    return ApiService.handleRequest(
      async () => {
        const { cart } = await sdk.store.cart.addShippingMethod(cartId, data)
        return cart
      },
      { loaderKey },
    )
  }

  static async fetchItemQuantityForItem(
    itemId: string,
    variantId: string,
    loaderKey: string,
  ): Promise<number> {
    return ApiService.handleRequest(
      async () => {
        const { product } = await sdk.store.product.retrieve(itemId, {
          fields: `*variants.calculated_price,+variants.inventory_quantity`,
        })
        if (product.variants) {
          const variant = product.variants.find((v) => v.id === variantId)
          if (variant) {
            return variant.inventory_quantity || 0
          }
        }
        return 1000
      },
      { loaderKey },
    )
  }

  static async removeItem(
    cartId: string,
    item: HttpTypes.StoreCartLineItem,
    loaderKey: string,
  ): Promise<HttpTypes.StoreCart> {
    const toastStore = useToastStore()

    return ApiService.handleRequest(
      async () => {
        const { deleted, parent: cart } = await sdk.store.cart.deleteLineItem(cartId, item.id, {
          fields: CART_FIELDS,
        })

        if (deleted) {
          toastStore.addInfo(`Item ${item.title} has been deleted`)
        }
        return cart
      },
      { loaderKey },
    )
  }
}

export default ApiService
