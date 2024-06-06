import { ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  anchorElement: ReactNode
  children?: ReactNode
  className?: string
}

function Popper({ anchorElement, children, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCartClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 z-[9]"
        ></div>
      )}
      <div className="relative">
        <div onClick={handleCartClick}>{anchorElement}</div>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className={twMerge(
              ' border-blue-950 drop-shadow-xl absolute  z-10 ',
              className,
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default Popper
