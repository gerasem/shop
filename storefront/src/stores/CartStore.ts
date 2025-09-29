import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLoaderStore } from '@/stores/LoaderStore'
import ApiService from '@/services/api/api'
import type { HttpTypes } from '@medusajs/types'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<HttpTypes.StoreCart | undefined>(undefined)

  const loaderStore = useLoaderStore()

  const initializeCart = async () => {
    const cartId = localStorage.getItem('cart_id')
    if (cartId) {
      const dataCart = await ApiService.retrieveCart(cartId, loaderStore.LOADER_KEYS.ADD_TO_CART)

      console.log('retrieveCart', dataCart)
      if (dataCart) {
        cart.value = dataCart
      } else {
        await refreshCart()
      }
    } else {
      await refreshCart()
    }
  }

  const refreshCart = async () => {
    console.log('Refresh cart')
    const dataCart = await ApiService.createCart(loaderStore.LOADER_KEYS.ADD_TO_CART)
    cart.value = dataCart
    localStorage.setItem('cart_id', dataCart.id)
    return dataCart
  }

  const addToCart = async (variantId: string, quantity: number): Promise<HttpTypes.StoreCart> => {
    if (!cart.value) {
      await refreshCart()
      throw new Error('Error initializing cart')
    }

    const dataCart = await ApiService.createCartLineItem(
      cart.value?.id,
      {
        variant_id: variantId,
        quantity,
      },
      loaderStore.LOADER_KEYS.ADD_TO_CART,
    )
    console.log('addToCart get cart', dataCart)
    cart.value = dataCart
    localStorage.setItem('cart_id', dataCart.id)
    return dataCart
  }

  /*  const updateCart = async ({
    updateData,
    shippingMethodData,
  }: {
    updateData?: HttpTypes.StoreUpdateCart
    shippingMethodData?: HttpTypes.StoreAddCartShippingMethods
  }): Promise<HttpTypes.StoreCart | undefined> => {
    if (!cart.value || (!updateData && !shippingMethodData)) {
      return cart.value
    }

    try {
      let returnedCart = cart.value
      if (updateData) {
        returnedCart = await ApiService.updateCart(cart.value.id, updateData, 'updateCartData')
      }
      if (shippingMethodData) {
        returnedCart = await ApiService.addCartShippingMethod(
          cart.value.id,
          shippingMethodData,
          'addCartShippingMethod',
        )
      }
      cart.value = returnedCart
      localStorage.setItem('cart_id', returnedCart.id)
      return returnedCart
    } catch (err) {
      console.error('Error update cart:', err)
      return undefined
    }
  } */

  const updateItemQuantity = async (itemId: string, quantity: number): Promise<void> => {
    if (!cart.value) {
      await refreshCart()
      throw new Error('Error initializing cart')
    }

    const dataCart = await ApiService.updateCartLineItem(
      cart.value.id,
      itemId,
      { quantity },
      loaderStore.LOADER_KEYS.EDIT_CART,
    )
    cart.value = dataCart
    localStorage.setItem('cart_id', dataCart.id)
    //return dataCart
  }

  const getItemQuantity = async (itemId: string, variantId: string): Promise<number> => {
    return await ApiService.fetchItemQuantityForItem(
      itemId,
      variantId,
      loaderStore.LOADER_KEYS.GET_ITEM_QUANTITY,
    )
  }

  const unsetCart = () => {
    cart.value = undefined
    localStorage.removeItem('cart_id')
  }

  const removeItem = async (item: HttpTypes.StoreCartLineItem): Promise<void> => {
    if (cart.value) {
      await ApiService.removeItem(cart.value.id, item, loaderStore.LOADER_KEYS.ADD_TO_CART)

      await initializeCart()
    }
  }

  return {
    cart,
    initializeCart,
    addToCart,
    refreshCart,
    updateItemQuantity,
    unsetCart,
    getItemQuantity,
    removeItem,
  }
})
