import { ForwardedRef, forwardRef } from 'react'
import Label from './Label'

type Props = {
  value?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  placeholder?: string
  label?: string
  options: { label: string; value: string }[]
  error?: string
  required?: boolean
}

const Select = forwardRef(
  (
    { className, label, options, required, placeholder, error, ...rest }: Props,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <div className={className}>
        {label && <Label required={required}>{label}</Label>}
        <select
          className="w-full border-2 border-blue-400 p-2 focus:outline-none focus:ring-1 rounded-md focus:ring-blue-400 text-gray-700 font-semibold"
          placeholder={placeholder}
          ref={ref}
          {...rest}
        >
          <option value="" className="text-gray-400 font-semibold mb-1">
            None
          </option>
          {options.map((option, i) => {
            return (
              <option
                key={i}
                value={option.value}
                className=" text-gray-700 font-semibold"
              >
                {option.label}
              </option>
            )
          })}
        </select>
        {error && <span className="text-red-700">{error}</span>}
      </div>
    )
  },
)

export default Select
