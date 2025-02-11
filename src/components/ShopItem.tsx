import { Product } from '../services/products'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import Heading from './common/Heading'
import { CartContext } from '../contexts/CartContext'
import { useContext, useState } from 'react'
import { MdOutlineAddShoppingCart } from 'react-icons/md'

type Props = {
  product: Product
}

function ShopItem({ product }: Props) {
  const { addCartItem } = useContext(CartContext)
  const [isClicked, setIsClicked] = useState(false)

  const handleButtonClick = () => {
    setIsClicked(true)
    addCartItem(product)
    setTimeout(() => {
      setIsClicked(false)
    }, 350)
  }

  return (
    <li className="border-2 border-blue-150 bg-blue-50 flex flex-col items-center drop-shadow-md p-1.5 transform transition duration-200 hover:scale-105">
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
        className={`flex justify-center items-center w-full p-2 mt-auto text-lg transform transition duration-200 ${
          isClicked ? 'scale-90  text-blue-500' : ''
        }`}
        onClick={handleButtonClick}
      >
        <MdOutlineAddShoppingCart className="mr-2" /> Add to Cart
      </Button>
    </li>
  )
}

export default ShopItem
