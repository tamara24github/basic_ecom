import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Shop from './pages/Shop'
import RootLayout from './components/layouts/RootLayout'
import ShopLayout from './components/layouts/ShopLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/shop" element={<ShopLayout />}>
          <Route index element={<Shop />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
