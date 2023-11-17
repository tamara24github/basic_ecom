import React from 'react'
import { GrBasket } from 'react-icons/gr'
function Navbar() {
  const links = [
    { label: 'Home', path: '/', divide: '|' },
    { label: 'Shop', path: '/shop', divide: '|' },
    { label: 'Admin', path: '/admin' },
  ]

  const renderLinks = links.map((link) => {
    return (
      <React.Fragment key={link.label}>
        <div className="text-blue-950 hover:bg-blue-400 hover:text-white rounded-md px-3 py-2 text-xl font-medium ">
          {link.label}
        </div>
        <p className="inline text-blue-400 text-xl mt-1">{link.divide}</p>
      </React.Fragment>
    )
  })
  return (
    <nav className=" h-14 flex items-center justify-between mx-12 font-extrabold ">
      <div className="flex space-x-6 ">{renderLinks}</div>
      <GrBasket className="text-3xl " />
    </nav>
  )
}

export default Navbar
