import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  children?: ReactNode
  required?: boolean
}

function Label({ className, children, required }: Props) {
  return (
    <label
      className={twMerge(
        'font-semibold text-xl text-blue-950 mb-2 inline-block',
        className,
      )}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}

export default Label
