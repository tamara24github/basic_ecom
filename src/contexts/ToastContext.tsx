import { nanoid } from 'nanoid'
import { createContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'

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
    setToasts((prevState) => [...prevState, { id: nanoid(), message, type }])
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
                'animate-toast rounded-2xl border-2 py-2 px-4 shadow-md',
                toast.type === 'success' &&
                  ' border-green-400 bg-green-100 text-green-950 ',
                toast.type === 'error' &&
                  ' border-red-400 bg-red-100 text-red-950',
              )}
              onAnimationEnd={() => deleteToastById(toast.id)}
            >
              {toast.message}
            </li>
          )
        })}
      </ul>
    </ToastContext.Provider>
  )
}
