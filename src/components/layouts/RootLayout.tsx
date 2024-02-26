import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import RootHeader from '../RootHeader'

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <RootHeader />

      <main className="grow flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default RootLayout
