import { ReactNode, useState } from 'react'

type Props = {
  anchorElement: ReactNode
  children?: ReactNode
}

function Popper({ anchorElement, children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCartClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <div onClick={handleCartClick}>{anchorElement}</div>
      {isOpen && (
        <div className="p-4 border-2 rounded-xl border-blue-950 drop-shadow-xl bg-white absolute right-8 top-8 z-10  w-[450px]">
          {children}
        </div>
      )}
    </div>
  )
}

export default Popper
