import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import ShopHeader from '../ShopHeader'

const ShopLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ShopHeader />

      <main className="grow flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default ShopLayout
