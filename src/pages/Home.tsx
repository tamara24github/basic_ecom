import { FaRegSnowflake } from 'react-icons/fa'

function Home() {
  return (
    <div className="h-screen text-white relative bg-gradient-to-b from-blue-950 to-blue-600 overflow-hidden">
      <FaRegSnowflake className="absolute top-20 left-20 text-9xl" />
      <div className="absolute top-72 left-1/3 w-1/3">
        <h1 className="text-5xl text-center font-extrabold">
          Winter Clothes Shop
        </h1>
        <p className="text-center mt-4">~ Basic Ecom website ~</p>
      </div>
      <FaRegSnowflake className="absolute bottom-20 right-20 text-9xl" />
      <div className="w-1/3 absolute bottom-5 left-1/3"></div>
    </div>
  )
}

export default Home
