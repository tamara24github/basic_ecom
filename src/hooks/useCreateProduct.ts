import {
  CreateProductPayload,
  Product,
  createProduct,
} from '../services/products'
import { useState } from 'react'

type CreateProductState = {
  isLoading: boolean
  error: string
  data: Product | null
}

const defaultCreateProduct: CreateProductState = {
  isLoading: false,
  error: '',
  data: null,
}

const useCreateProduct = () => {
  const [createProductState, setCreateProductState] =
    useState<CreateProductState>(defaultCreateProduct)

  const fetchCreateProduct = async (props: {
    payload: CreateProductPayload
    onSuccess?: (data: Product) => void
    onError?: (error: Error) => void
  }) => {
    const { payload, onSuccess, onError } = props
    try {
      setCreateProductState((previousState) => ({
        ...previousState,
        isLoading: true,
        error: '',
      }))
      const data = await createProduct(payload)
      setCreateProductState((previousState) => ({
        ...previousState,
        isLoading: false,
        data,
      }))
      onSuccess?.(data)
    } catch (err) {
      const error = err as Error
      setCreateProductState((previousState) => ({
        ...previousState,
        isLoading: false,
        error: error.message,
      }))
      onError?.(error)
    }
  }

  const update = (callback: (data: CreateProductState['data']) => Product) =>
    setCreateProductState((previousState) => ({
      ...previousState,
      data: callback(previousState.data),
    }))

  return {
    ...createProductState,
    fetchCreateProduct,
    update,
  }
}

export default useCreateProduct
