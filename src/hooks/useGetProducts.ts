import { Product, getAllProducts } from '../services/products'
import { useState } from 'react'

type GetProductsState = {
  isLoading: boolean
  error: string
  data: Product[]
}

const defaultGetProductsState: GetProductsState = {
  isLoading: false,
  error: '',
  data: [],
}

const useGetProducts = () => {
  const [getProductsState, setGetProductsState] = useState<GetProductsState>(
    defaultGetProductsState,
  )

  const fetchGetProducts = async (props: {
    query?: string
    onSuccess?: (data: Product[]) => void
    onError?: (error: Error) => void
  }) => {
    const { query, onSuccess, onError } = props
    try {
      setGetProductsState((previousState) => ({
        ...previousState,
        isLoading: true,
        error: '',
      }))
      const data = await getAllProducts(query)
      setGetProductsState((previousState) => ({
        ...previousState,
        isLoading: false,
        data,
      }))
      onSuccess?.(data)
    } catch (err) {
      const error = err as Error
      setGetProductsState((previousState) => ({
        ...previousState,
        isLoading: false,
        error: error.message,
      }))
      onError?.(error)
    }
  }

  const update = (callback: (data: GetProductsState['data']) => Product[]) =>
    setGetProductsState((previousState) => ({
      ...previousState,
      data: callback(previousState.data),
    }))

  return {
    ...getProductsState,
    fetchGetProducts,
    update,
  }
}

export default useGetProducts
