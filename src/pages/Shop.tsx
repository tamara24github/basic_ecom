import { getAllProducts, Product } from '../services/products'
import { useQuery } from '@tanstack/react-query'
import ShopItem from '../components/ShopItem'
import Heading from '../components/common/Heading'
import { useState, ChangeEvent } from 'react'
import TextField from '../components/common/TextField'
import Paragraph from '../components/common/Paragraph'
import { FaSpinner } from 'react-icons/fa'
import { MdErrorOutline } from 'react-icons/md'

function Shop() {
  const [searchItem, setSearchItem] = useState('')

  const handleSearchItem = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value)
  }

  const productsFilter = (products: Product[]) =>
    products.filter((product) =>
      product.name.toLowerCase().includes(searchItem.toLowerCase()),
    )

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
    select: productsFilter,
  })

  const { error, isLoading, data } = productsQuery

  return (
    <>
      <div className="mx-auto my-[3rem] text-center">
        <Heading
          fontWeight="semibold"
          fontSize="xl2"
          color="blueDark"
          className="mb-5"
        >
          Explore our Shop: Elevate your ride
        </Heading>
        <TextField
          withIcon
          onChange={handleSearchItem}
          value={searchItem}
          placeholder="Search"
          className=" md:w-[600px]"
        />
      </div>

      <ul className="grid lg:grid-cols-4 grid-cols-2 gap-10 mx-[4rem] my-[2rem]">
        {data?.map((product) => {
          return <ShopItem product={product} key={product.id} />
        })}
        <li className="flex items-center flex-col mt-12 lg:col-span-4 col-span-2 ">
          {!data?.length && !isLoading && !error && (
            <Paragraph className="text-xl my-4" weight="semibold">
              There is no such item
            </Paragraph>
          )}
          {isLoading && (
            <>
              <FaSpinner className="animate-spin h-9 w-9 mr-3" />
              <Paragraph className="mt-4 text-xl" weight="semibold">
                Loading ...
              </Paragraph>
            </>
          )}
          {error && (
            <>
              <MdErrorOutline className="animate-bounce h-12 w-12 text-red-600" />
              <Paragraph
                className="mt-4 text-xl text-red-600"
                weight="semibold"
              >
                {error?.message}
              </Paragraph>
            </>
          )}
        </li>
      </ul>
    </>
  )
}

export default Shop
