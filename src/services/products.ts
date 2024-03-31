import { jsonServerApi } from './jsonServerApi'

const PATH = '/products'

type Color = 'Black' | 'Gray' | 'Navy Blue' | 'Burgundy'

export const colors: Color[] = ['Black', 'Burgundy', 'Gray', 'Navy Blue']

type Category =
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

type Feature =
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

export const getAllProducts = () => jsonServerApi<Product[]>(PATH)
