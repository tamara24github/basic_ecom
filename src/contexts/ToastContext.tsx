import { nanoid } from 'nanoid'
import { createContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from 'react-icons/io'

type ToastContextType = {
  toast: ({ message, type }: { message: string; type: Toast['type'] }) => void
}

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType,
)

type ToastContextProviderProps = {
  children: React.ReactNode
}

type Toast = {
  id: string
  message: string
  type: 'success' | 'error'
}

export const ToastContextProvider = ({
  children,
}: ToastContextProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({
    message,
    type,
  }: {
    message: string
    type: Toast['type']
  }) => {
    const id = nanoid()
    setToasts((prevState) => [...prevState, { id, message, type }])

    setTimeout(() => {
      deleteToastById(id)
    }, 3500)
  }

  const deleteToastById = (id: string) => {
    setToasts((prevState) => prevState.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ul className="absolute top-4 left-[50%] -translate-x-1/2 space-y-2">
        {toasts.map((toast) => {
          return (
            <li
              key={toast.id}
              className={twMerge(
                'animate-toast rounded-2xl border-2 py-2 px-4 shadow-md flex flex-row items-center font-semibold',
                toast.type === 'success' &&
                  ' border-green-400 bg-green-100 text-green-950 ',
                toast.type === 'error' &&
                  ' border-red-400 bg-red-100 text-red-950',
              )}
              onAnimationEnd={() => deleteToastById(toast.id)}
            >
              {toast.type === 'success' && (
                <IoIosCheckmarkCircleOutline className="mr-2 text-2xl text-green-600 " />
              )}
              {toast.type === 'error' && (
                <IoIosCloseCircleOutline className="mr-2 text-2xl text-red-600 " />
              )}
              {toast.message}
            </li>
          )
        })}
      </ul>
    </ToastContext.Provider>
  )
}
