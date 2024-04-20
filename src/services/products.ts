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

export type Feature =
  | 'Water resistant'
  | '100% Merino wool'
  | 'Windproof'
  | 'Available in various sizes'
  | 'Cozy and warm'

export const features: Feature[] = [
  '100% Merino wool',
  'Available in various sizes',
  'Cozy and warm',
  'Water resistant',
  'Windproof',
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
  features: Feature[]
}

export const getAllProducts = (query?: string) =>
  jsonServerApi<Product[]>(PATH, undefined, query)

export type CreateProductPayload = {
  name: string
  description?: string
  image: string
  price: number
  stockQuantity: number
  category: string
  color: string
  features?: string[]
  availability: boolean
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
