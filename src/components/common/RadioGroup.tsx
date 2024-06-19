import { ForwardedRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

type Props = {
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  name?: string
  label?: string
  options: { value: string; label: string }[]
  required?: boolean
}

const RadioGroup = forwardRef(
  (
    { className, label, options, required, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className={twMerge('flex flex-col', className)}>
        {label && <Label required={required}>{label}</Label>}
        {options.map((option, i) => {
          return (
            <Label className="text-sm" key={i}>
              <input
                type="radio"
                value={option.value}
                className="h-4 w-4 ms-2 me-1 mt-0.5 "
                ref={ref}
                {...props}
              />
              <span className="ml-3  text-gray-700 ">{option.label}</span>
            </Label>
          )
        })}
      </div>
    )
  },
)

export default RadioGroup
