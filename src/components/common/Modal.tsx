import { ReactNode, useEffect } from 'react'

type Props = {
  closeModal: () => void
  children: ReactNode
  actionBar: ReactNode
}

function Modal({ closeModal, children, actionBar }: Props) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])
  return (
    <>
      <div
        className="fixed bg-gray-300 opacity-80 inset-0 z-40"
        onClick={closeModal}
      />
      <div className="fixed inset-x-40 p-8 bg-white rounded-lg z-50 flex flex-col justify-between">
        {children}
        <div className="flex justify-center ">{actionBar}</div>
      </div>
    </>
  )
}

export default Modal
