import Cart from './Cart'
import Navbar from './Navbar'

function ShopHeader() {
  return (
    <header className="flex justify-between items-center">
      <Navbar />
      <Cart />
    </header>
  )
}

export default ShopHeader
