import { deleteProduct } from '../services/products'
import { useState } from 'react'

type DeleteProductState = {
  isLoading: boolean
  error: string
  data: string
}

const defaultDeleteProductState: DeleteProductState = {
  isLoading: false,
  error: '',
  data: '',
}

const useDeleteProduct = () => {
  const [deleteProductState, setDeleteProductState] =
    useState<DeleteProductState>(defaultDeleteProductState)

  const fetchDeleteProduct = async (props: {
    id: string
    onSuccess?: (data: string) => void
    onError?: (error: Error) => void
  }) => {
    const { id, onSuccess, onError } = props
    try {
      setDeleteProductState((previousState) => ({
        ...previousState,
        isLoading: true,
        error: '',
      }))
      await deleteProduct(id)
      setDeleteProductState((previousState) => ({
        ...previousState,
        isLoading: false,
        data: id,
      }))
      onSuccess?.(id)
    } catch (err) {
      const error = err as Error
      setDeleteProductState((previousState) => ({
        ...previousState,
        isLoading: false,
        error: error.message,
      }))
      onError?.(error)
    }
  }

  const update = (callback: (data: DeleteProductState['data']) => string) =>
    setDeleteProductState((previousState) => ({
      ...previousState,
      data: callback(previousState.data),
    }))

  return {
    ...deleteProductState,
    fetchDeleteProduct,
    update,
  }
}

export default useDeleteProduct
