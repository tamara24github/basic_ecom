import { twMerge } from 'tailwind-merge'
import Label from './Label'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  name?: string
  label?: string
  options: { value: string; label: string }[]
  required?: boolean
}

function RadioGroup({
  value,
  onChange,
  name,
  className,
  label,
  options,
  required,
}: Props) {
  return (
    <div className={twMerge('flex flex-col', className)}>
      {label && <Label required={required}>{label}</Label>}
      {options.map((option) => {
        return (
          <Label className="text-sm">
            <input
              required={required}
              checked={value === option.value}
              name={name}
              type="radio"
              value={option.value}
              onChange={onChange}
              className="h-4 w-4 ms-2 me-1 mt-0.5 "
            />
            <span className="ml-3  text-gray-700 ">{option.label}</span>
          </Label>
        )
      })}
    </div>
  )
}

export default RadioGroup
