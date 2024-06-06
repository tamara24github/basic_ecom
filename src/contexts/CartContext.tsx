import { ReactNode, createContext, useEffect, useState } from 'react'
import { Product } from '../services/products'

export type CartItemType = Product & {
  quantity: number
}

type CartContextProps = {
  addCartItem: (product: Product) => void
  removeCartItem: (productId: string) => void
  deleteCartItem: (productId: string) => void
  cartItems: CartItemType[]
  cartCount: number
  total: number
}

const defaultCartContext = {
  addCartItem: () => {},
  removeCartItem: () => {},
  deleteCartItem: () => {},
  cartItems: [],
  cartCount: 0,
  total: 0,
}

export const CartContext = createContext<CartContextProps>(defaultCartContext)

type CartContextProviderProps = { children?: ReactNode }

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(
    JSON.parse(localStorage.getItem('cartItems') || '[]'),
  )
  const [cartCount, setCartCount] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    setCartCount(
      cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0),
    ),
      setTotal(
        Number(
          cartItems
            .reduce(
              (total, cartItem) => total + cartItem.price * cartItem.quantity,
              0,
            )
            .toFixed(2),
        ),
      )
  }, [cartItems])

  const addCartItem = (product: Product) => {
    const isProductInCart = cartItems.some(
      (cartItem) => cartItem.id === product.id,
    )
    if (isProductInCart) {
      setCartItems((prevState) =>
        prevState.map((cartItem) => {
          if (cartItem.id === product.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 }
          }
          return cartItem
        }),
      )
    } else {
      setCartItems((prevState) => [...prevState, { ...product, quantity: 1 }])
    }
  }

  const removeCartItem = (productId: string) => {
    const isLastQuantity =
      cartItems.find((cartItem) => cartItem.id === productId)?.quantity === 1
    if (isLastQuantity) {
      setCartItems((prevState) =>
        prevState.filter((cartItem) => cartItem.id !== productId),
      )
    } else {
      setCartItems((prevState) =>
        prevState.map((cartItem) => {
          if (cartItem.id === productId) {
            return { ...cartItem, quantity: cartItem.quantity - 1 }
          }

          return cartItem
        }),
      )
    }
  }

  const deleteCartItem = (productId: string) => {
    setCartItems((prevState) =>
      prevState.filter((cartItem) => {
        return cartItem.id !== productId
      }),
    )
  }

  return (
    <CartContext.Provider
      value={{
        addCartItem,
        removeCartItem,
        deleteCartItem,
        cartItems,
        cartCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
