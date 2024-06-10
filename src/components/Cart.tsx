import Popper from './Popper'
import { TiShoppingCart } from 'react-icons/ti'
import Heading from './common/Heading'
import Paragraph from './common/Paragraph'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import CartItem from './CartItem'

function Cart() {
  const { cartItems, cartCount, total } = useContext(CartContext)

  return (
    <Popper
      className=" w-[450px] p-4 border-2 rounded-xl bg-white right-8 top-8"
      anchorElement={
        <div className="relative flex flex-col">
          <div className="bg-blue-950 w-5 text-center rounded-full font-semibold  text-white absolute right-[23px]">
            {cartCount}
          </div>
          <TiShoppingCart className="text-4xl text-blue-950 mr-4 mt-[18px] cursor-pointer" />
        </div>
      }
    >
      <Heading as="h2" fontSize="xl" fontWeight="semibold" className="mb-3">
        Your Cart:
      </Heading>
      {cartItems.map((cartItem, index) => {
        return <CartItem cartItem={cartItem} index={index} key={cartItem.id} />
      })}
      <div className="h-[1px] w-full bg-gray-400 mt-5" />
      <Paragraph weight="semibold" className="mt-5">
        Total: {total}€
      </Paragraph>
    </Popper>
  )
}

export default Cart
