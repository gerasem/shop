import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRegionStore } from '@/stores/RegionStore'
import { useLoaderStore } from '@/stores/LoaderStore'
import ApiService from '@/services/api/api'
import type { HttpTypes } from '@medusajs/types'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<HttpTypes.StoreCart | undefined>(undefined)
  const loaderStore = useLoaderStore()

  const initializeCart = async () => {
    const regionStore = useRegionStore()
    if (!regionStore.regionId) {
      return
    }

    const cartId = localStorage.getItem('cart_id')
    if (cartId) {
      const dataCart = await ApiService.retrieveCart(
        cartId,

        loaderStore.LOADER_KEYS.ADD_TO_CART,
      )
      cart.value = dataCart
      localStorage.setItem('cart_id', dataCart.id)
    } else {
      await refreshCart()
    }
  }

  watch(
    () => useRegionStore().regionId,
    async (newRegion) => {
      if (!cart.value || !newRegion || cart.value.region_id === newRegion) {
        return
      }

      const dataCart = await ApiService.updateCart(
        cart.value.id,
        { region_id: newRegion },
        'updateCartRegion',
      )
      cart.value = dataCart
      localStorage.setItem('cart_id', dataCart.id)
    },
    { immediate: true },
  )

  const refreshCart = async () => {
    const regionStore = useRegionStore()
    if (!regionStore.regionId) {
      return
    }

    try {
      const dataCart = await ApiService.createCart(
        { region_id: regionStore.regionId },
        'refreshCart',
      )
      cart.value = dataCart
      localStorage.setItem('cart_id', dataCart.id)
      return dataCart
    } catch (err) {
      console.error('Error update cart', err)
      return undefined
    }
  }

  const addToCart = async (variantId: string, quantity: number): Promise<HttpTypes.StoreCart> => {
    try {
      let newCart = cart.value
      if (!newCart) {
        newCart = await refreshCart()
        if (!newCart) {
          throw new Error('Error creating cart')
        }
      }

      const dataCart = await ApiService.createCartLineItem(
        newCart.id,
        { variant_id: variantId, quantity },
        loaderStore.LOADER_KEYS.ADD_TO_CART,
      )
      cart.value = dataCart
      localStorage.setItem('cart_id', dataCart.id)
      return dataCart
    } catch (err) {
      console.error('Error add to cart', err)
      throw err
    }
  }

  const updateCart = async ({
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
  }

  const updateItemQuantity = async (
    itemId: string,
    quantity: number,
  ): Promise<HttpTypes.StoreCart> => {
    if (!cart.value) {
      throw new Error('Error initializing cart')
    }

    try {
      const dataCart = await ApiService.updateCartLineItem(
        cart.value.id,
        itemId,
        { quantity },
        'updateCartItemQuantity',
      )
      cart.value = dataCart
      localStorage.setItem('cart_id', dataCart.id)
      return dataCart
    } catch (err) {
      console.error('Error updating qty of item:', err)
      throw err
    }
  }

  const unsetCart = () => {
    cart.value = undefined
    localStorage.removeItem('cart_id')
  }

  return {
    cart,
    initializeCart,
    addToCart,
    updateCart,
    refreshCart,
    updateItemQuantity,
    unsetCart,
  }
})
