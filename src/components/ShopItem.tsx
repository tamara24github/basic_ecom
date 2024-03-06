import { Product } from '../services/products'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import Heading from './common/Heading'
import { CartContext } from '../contexts/CartContext'
import { useContext } from 'react'

type Props = {
  product: Product
}

function ShopItem({ product }: Props) {
  const { addCartItem } = useContext(CartContext)

  return (
    <li className="border-2 border-blue-150 bg-blue-50 flex flex-col items-center drop-shadow-md p-1.5">
      <img
        src={product.image}
        alt="image"
        className="h-[250px] bg-no-repeat object-center bg-transparent object-cover aspect-[4/3] mb-1"
      />
      <Heading
        as="h2"
        color="blueDark"
        fontWeight="semibold"
        fontSize="large"
        className="m-1"
      >
        {product.name}
      </Heading>
      <Paragraph weight="bold" size="md" className="mb-3">
        {product.price} €
      </Paragraph>
      <Paragraph className="mx-6 mb-2 mt-auto">{product.description}</Paragraph>
      <Paragraph weight="semibold" className=" text-blue-500 mb-3 mt-auto">
        Available in color: {product.color}
      </Paragraph>
      <Button
        rounded="md"
        backgroundColor="blueDark"
        hover="blueLight"
        fontWeight="semibold"
        textColor="white"
        className="w-full p-2 mt-auto text-lg "
        onClick={() => addCartItem(product)}
      >
        + Add to Cart
      </Button>
    </li>
  )
}

export default ShopItem
