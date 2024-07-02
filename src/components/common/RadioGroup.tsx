import { twMerge } from 'tailwind-merge'
import Label from './Label'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  name?: string
  label?: string
  options: { value: string; label: string }[]
  error?: string
  required?: boolean
}

const RadioGroup = forwardRef(
  (
    { className, label, options, required, error, ...rest }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className={twMerge('flex flex-col', className)}>
        {label && <Label required={required}>{label}</Label>}
        {options.map((option, i) => {
          return (
            <Label className="text-sm" key={i}>
              <input
                className="h-4 w-4 ms-2 me-1 mt-0.5 "
                ref={ref}
                value={option.value}
                type="radio"
                {...rest}
              />
              <span className="ml-3  text-gray-700 ">{option.label}</span>
            </Label>
          )
        })}
        {error && <span className="text-red-700">{error}</span>}
      </div>
    )
  },
)

export default RadioGroup
