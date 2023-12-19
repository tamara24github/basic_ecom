import { Product } from '../services/products'

type Props = {
  product: Product
}

function ShopItem({ product }: Props) {
  return (
    <li className="border-2 border-blue-150 bg-blue-50 flex flex-col items-center drop-shadow-md p-1.5">
      <img
        src={product.image}
        alt="image"
        className="h-[250px] bg-no-repeat object-center bg-transparent object-cover aspect-[4/3] mb-1"
      />
      <h3 className="m-1 font-semibold  text-blue-950 text-lg">
        {product.name}
      </h3>
      <p className="mb-3 font-semibold">{product.price} €</p>
      <p className="mx-6 mb-3 w-[250px]">{product.description}</p>
      <p className="w-[250px]  text-blue-500">
        Available in color: {product.color}
      </p>
    </li>
  )
}

export default ShopItem
