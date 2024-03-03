import { getAllProducts, Product } from '../services/products'
import { useQuery } from '@tanstack/react-query'
import ShopItem from '../components/ShopItem'
import Heading from '../components/common/Heading'
import { useState, useCallback, ChangeEvent } from 'react'

function Shop() {
  const [searchItem, setSearchItem] = useState('')

  const handleSearchItem = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value)
  }

  const productsFilter = useCallback(
    (products: Product[]) =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchItem.toLowerCase()),
      ),
    [searchItem],
  )

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
    select: productsFilter,
  })

  const { error, isLoading, data } = productsQuery

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <>{JSON.stringify(error)}</>
  }
  if (!data?.length) {
    return <>There is no such item</>
  }

  return (
    <>
      <div className="mx-auto my-[3rem] text-center">
        <Heading fontWeight="semibold" fontSize="xl2" color="blueDark">
          Explore our Shop: Elevate your ride
        </Heading>
        <input
          onChange={handleSearchItem}
          value={searchItem}
          className="mt-3 block md:w-[600px] w-full px-3 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-400"
          placeholder="Search"
        />
      </div>
      <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mx-[4rem] my-[2rem] ">
        {data?.map((product) => {
          return <ShopItem product={product} key={product.id} />
        })}
      </ul>
    </>
  )
}

export default Shop
