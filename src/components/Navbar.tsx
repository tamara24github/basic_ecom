import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', path: '/', divide: '|' },
  { label: 'Shop', path: '/shop', divide: '|' },
  { label: 'Admin', path: '/admin' },
]

function Navbar() {
  return (
    <nav className=" h-14 flex items-center mx-6 font-extrabold justify-start">
      {links.map((link) => {
        return (
          <React.Fragment key={link.label}>
            <NavLink
              to={link.path}
              className="text-blue-950 hover:bg-blue-400 hover:text-white rounded-md px-3 py-2 text-xl font-medium  mx-3.5 [&.active]:bg-blue-950 [&.active]:text-white"
            >
              {link.label}
            </NavLink>
            <p className="inline text-blue-400 text-xl mt-1 mx-2">
              {link.divide}
            </p>
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export default Navbar
