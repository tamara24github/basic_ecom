import { useEffect } from 'react'
import { getAllProducts } from '../services/products'

function Shop() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts()
        console.log(products)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return <div>Shop</div>
}

export default Shop
