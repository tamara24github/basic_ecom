import { getAllProducts } from '../services/products'
import { useQuery } from '@tanstack/react-query'
import ShopItem from '../components/ShopItem'

function Shop() {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  })

  const { error, isLoading, data } = productsQuery

  if (isLoading) {
    return <p>Loading ...</p>
  }
  if (error) {
    return <>{JSON.stringify(error)}</>
  }
  if (!data?.length) {
    return <>There is no products</>
  }

  return (
    <>
      <form className="mx-auto my-[3rem] text-center">
        <label className="font-semibold text-lg text-blue-950">
          Explore our Shop: Elevate your ride
        </label>
        <input
          className="mt-3 block w-[600px] px-3 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:border-blue-950 focus:ring-1 focus:ring-blue-400"
          placeholder="search"
        />
      </form>
      <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mx-[4rem] my-[2rem] ">
        {data?.map((product) => {
          return <ShopItem product={product} key={product.id} />
        })}
      </ul>
    </>
  )
}

export default Shop
