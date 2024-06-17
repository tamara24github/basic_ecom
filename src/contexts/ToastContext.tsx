import { nanoid } from 'nanoid'
import React, { createContext, useState } from 'react'
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

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ul>
        {toasts.map((toast) => {
          return (
            <li
              key={toast.id}
              className={twMerge(
                toast.type === 'success' && 'bg-green-500',
                toast.type === 'error' && 'bg-red-500',
              )}
            >
              {toast.message}
            </li>
          )
        })}
      </ul>
    </ToastContext.Provider>
  )
}
