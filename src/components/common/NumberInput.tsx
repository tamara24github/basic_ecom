import { twMerge } from 'tailwind-merge'
import Label from './Label'

type Props = {
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  placeholder?: string
  label?: string
  withIcon?: boolean
  required?: boolean
}

function NumberInput({
  value,
  onChange,
  className,
  placeholder,
  withIcon,
  label,
  required,
}: Props) {
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
          required={required}
          type="number"
          step=".01"
          min={0}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={twMerge(
            'border-2 border-blue-400 p-2 w-full focus:outline-none focus:ring-1 rounded-md focus:ring-blue-400 text-gray-700 font-semibold',
            withIcon && 'pl-7',
          )}
        />
      </div>
    </div>
  )
}

export default NumberInput
