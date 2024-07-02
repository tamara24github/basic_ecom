import { twMerge } from 'tailwind-merge'
import Label from './Label'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  value?: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
  label?: string
  withIcon?: boolean
  error?: string
  required?: boolean
}

const NumberInput = forwardRef(
  (
    {
      className,
      placeholder,
      withIcon,
      label,
      required,
      error,
      ...rest
    }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className={className}>
        {label && <Label required={required}>{label}</Label>}
        <div className="relative">
          {withIcon && (
            <span className="absolute left-2 top-2 text-lg text-blue-950 font-semibold">
              €
            </span>
          )}
          <input
            className={twMerge(
              'border-2 border-blue-400 p-2 w-full focus:outline-none focus:ring-1 rounded-md focus:ring-blue-400 text-gray-700 font-semibold',
              withIcon && 'pl-7',
            )}
            type="number"
            step=".01"
            min={0}
            placeholder={placeholder}
            ref={ref}
            {...rest}
          />
        </div>
        {error && <span className="text-red-700">{error}</span>}
      </div>
    )
  },
)

export default NumberInput
