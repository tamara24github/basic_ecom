import { ForwardedRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

type Props = {
  value?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  placeholder?: string
  rows?: number
  label?: string
  required?: boolean
}

const TextArea = forwardRef(
  (
    { className, placeholder, rows, label, required, ...props }: Props,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <div className={className}>
        {label && <Label required={required}>{label}</Label>}
        <textarea
          rows={rows}
          placeholder={placeholder}
          className={twMerge(
            'resize-none w-full p-2 border-2 border-blue-400 focus:outline-none focus:ring-1 rounded-md focus:ring-blue-400 text-gray-700 font-semibold',
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

export default TextArea
