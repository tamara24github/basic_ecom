import { ReactNode, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  closeModal: () => void
  children: ReactNode
  className: string
}

function Modal({ closeModal, children, className }: Props) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])
  return (
    <div className="flex flex-col items-center fixed z-10 inset-0 overflow-y-auto">
      <div
        className="fixed -z-[1] inset-0 bg-opacity-50 bg-gray-900 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div
        className={twMerge(
          'm-4 bg-white rounded-md px-6 py-4 md:px-8 md:py-6 shadow-md',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
