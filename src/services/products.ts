import { jsonServerApi } from './jsonServerApi'

const PATH = '/products'

export type Color = 'Black' | 'Gray' | 'Navy Blue' | 'Burgundy'

export const colors: Color[] = ['Black', 'Burgundy', 'Gray', 'Navy Blue']

export type Category =
  | 'Jackets'
  | 'Footwear'
  | 'Snowsuits'
  | 'Accessories'
  | 'Bottoms'
  | 'Shirts'

export const categories: Category[] = [
  'Accessories',
  'Bottoms',
  'Footwear',
  'Jackets',
  'Shirts',
  'Snowsuits',
]

export type Product = {
  id: string
  name: string
  category: Category
  description: string
  color: Color
  price: number
  availability: boolean
  stockQuantity: number
  image: string
}

export const getAllProducts = (query?: string) =>
  jsonServerApi<Product[]>(PATH, undefined, query)

export const getAllProductsPaginated = (query?: string) =>
  jsonServerApi<{ lastPage: number; data: Product[] }>(PATH, undefined, query)

export type CreateProductPayload = {
  name: string
  description?: string
  image: string
  price: number
  stockQuantity: number
  category: string
  color: string
  availability: boolean
}

type EditProductPayload = CreateProductPayload

type updateAvailabilityPayload = {
  id: string
  payload: boolean
}

export const createProduct = (payload: CreateProductPayload) =>
  jsonServerApi<Product>(PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(payload),
  })

export const deleteProduct = (id: string = '') =>
  jsonServerApi<Product>(`${PATH}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })

export const editProduct =
  (id: string = '') =>
  (payload: EditProductPayload) =>
    jsonServerApi<Product>(`${PATH}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(payload),
    })

export const updateAvailability = ({
  payload,
  id,
}: updateAvailabilityPayload) =>
  jsonServerApi<Product>(`${PATH}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ availability: payload }),
  })
