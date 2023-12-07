import { jsonServerApi } from './jsonServerApi'

const PATH = '/products'

type Color = 'Black' | 'Gray' | 'Navy Blue' | 'Burgundy'

type Category =
  | 'Jackets'
  | 'Footwear'
  | 'Snowsuits'
  | 'Accessories'
  | 'Bottoms'
  | 'Shirts'

type Feature =
  | 'Water resistant'
  | '100% Merino wool'
  | 'Windproof'
  | 'Available in various sizes'
  | 'Cozy and warm'

type Product = {
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

export const getAllProducts = () => jsonServerApi<Product>(PATH)
