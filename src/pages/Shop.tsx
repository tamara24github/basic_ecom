import { getAllProducts, Product } from '../services/products'
import ShopItem from '../components/ShopItem'
import Heading from '../components/common/Heading'
import { useState, ChangeEvent, useEffect } from 'react'
import TextField from '../components/common/TextField'
import Paragraph from '../components/common/Paragraph'
import { FaSpinner } from 'react-icons/fa'
import { MdErrorOutline } from 'react-icons/md'

type GetProducts = {
  isLoading: boolean
  error: string
  data: Product[]
}

const defaultGetProducts: GetProducts = {
  isLoading: false,
  error: '',
  data: [],
}

function Shop() {
  const [searchItem, setSearchItem] = useState('')
  const [getProducts, setGetProducts] =
    useState<GetProducts>(defaultGetProducts)
  const [initialGetProductsData, setInitialGetProductsData] = useState<
    Product[]
  >([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setGetProducts((currentValue) => ({
          ...currentValue,
          isLoading: true,
          error: '',
        }))

        const data = await getAllProducts('?availability=true')
        setInitialGetProductsData(data)
        setGetProducts((currentValue) => ({
          ...currentValue,
          isLoading: false,
          data,
        }))
      } catch (error) {
        setGetProducts((currentValue) => ({
          ...currentValue,
          isLoading: false,
          error: (error as Error).message,
        }))
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const getFilteredProductsData = (products: Product[], filter: string) =>
      products.filter((product) =>
        product.name.toLowerCase().includes(filter.toLowerCase()),
      )
    const filteredProductsData = getFilteredProductsData(
      initialGetProductsData,
      searchItem,
    )
    setGetProducts((currentValue) => ({
      ...currentValue,
      data: filteredProductsData,
    }))
  }, [initialGetProductsData, searchItem])

  const handleSearchItem = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value)
  }

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
        {getProducts.data?.map((product) => {
          return <ShopItem product={product} key={product.id} />
        })}
        <li className="flex items-center flex-col mt-12 lg:col-span-4 col-span-2 ">
          {!getProducts.data?.length &&
            !getProducts.isLoading &&
            !getProducts.error && (
              <Paragraph className="text-xl my-4" weight="semibold">
                There is no such item
              </Paragraph>
            )}
          {getProducts.isLoading && (
            <>
              <FaSpinner className="animate-spin h-9 w-9 mr-3" />
              <Paragraph className="mt-4 text-xl" weight="semibold">
                Loading ...
              </Paragraph>
            </>
          )}
          {getProducts.error && (
            <>
              <MdErrorOutline className="animate-bounce h-12 w-12 text-red-600" />
              <Paragraph
                className="mt-4 text-xl text-red-600"
                weight="semibold"
              >
                {getProducts.error}
              </Paragraph>
            </>
          )}
        </li>
      </ul>
    </>
  )
}

export default Shop
