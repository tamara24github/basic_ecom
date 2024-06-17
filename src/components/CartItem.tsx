import { CartItemType } from '../contexts/CartContext'
import Button from './common/Button'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import { CartContext } from '../contexts/CartContext'
import { useContext } from 'react'
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io'

type Props = {
  cartItem: CartItemType
  index: number
}

function CartItem({ cartItem, index }: Props) {
  const { addCartItem, removeCartItem, deleteCartItem } =
    useContext(CartContext)

  return (
    <>
      {index !== 0 && <div className="h-[1px] w-full bg-gray-400" />}

      <div className="flex justify-between items-center h-28 p-3">
        <img
          src={cartItem.image}
          className="w-16 bg-no-repeat object-center aspect-[3/4] object-cover"
        />

        <div className="w-52">
          <Heading as="h4" fontWeight="semibold" className="mb-2">
            {cartItem.name}
          </Heading>
          <div className="mb-1 flex items-center">
            Quantity:{' '}
            <IoMdRemoveCircleOutline
              className="w-[29px] h-[29px] text-red-500 mx-2 text-[19px] hover:text-red-700"
              onClick={(e: React.MouseEvent<SVGElement>) => {
                e.stopPropagation()
                removeCartItem(cartItem.id)
              }}
            />
            <span className="mx-1 font-bold">{cartItem.quantity}</span>
            <IoMdAddCircleOutline
              className="w-[29px] h-[29px] text-[19px] mx-2 text-green-500 hover:text-green-700"
              onClick={(e: React.MouseEvent<SVGElement>) => {
                e.stopPropagation()
                addCartItem(cartItem)
              }}
            />
          </div>
          <Paragraph className="mt-2">{cartItem.price} €</Paragraph>
        </div>

        <Button
          textColor="red"
          hover="red"
          className="w-20 h-8 border border-red-200 "
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            deleteCartItem(cartItem.id)
          }}
        >
          Remove
        </Button>
      </div>
    </>
  )
}

export default CartItem
