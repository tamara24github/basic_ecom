import { ForwardedRef, forwardRef } from 'react'
import Label from './Label'

type Props = {
  value?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  placeholder?: string
  label?: string
  options: { label: string; value: string }[]
  required?: boolean
}

const Select = forwardRef(
  (
    { className, label, options, required, placeholder, ...props }: Props,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <div className={className}>
        {label && <Label required={required}>{label}</Label>}
        <select
          placeholder={placeholder}
          className="w-full border-2 border-blue-400 p-2 focus:outline-none focus:ring-1 rounded-md focus:ring-blue-400 text-gray-700 font-semibold"
          ref={ref}
          {...props}
        >
          <option value="" className="text-gray-400 font-semibold mb-1">
            None
          </option>
          {options.map((option, i) => {
            return (
              <option
                className=" text-gray-700 font-semibold"
                key={i}
                value={option.value}
              >
                {option.label}
              </option>
            )
          })}
        </select>
      </div>
    )
  },
)

export default Select
