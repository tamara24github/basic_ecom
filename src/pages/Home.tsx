import { FaRegSnowflake } from 'react-icons/fa'

function Home() {
  return (
    <section className="grow text-white relative bg-gradient-to-b from-blue-950 to-blue-600">
      <FaRegSnowflake className="absolute top-20 left-20 text-9xl" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-1/3">
        <h1 className="text-5xl text-center font-extrabold">
          Winter Clothes Shop
        </h1>
        <p className="text-center mt-4">~ Basic Ecom website ~</p>
      </div>
      <FaRegSnowflake className="absolute bottom-20 right-20 text-9xl" />
    </section>
  )
}

export default Home
