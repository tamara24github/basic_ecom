import Label from './Label'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  placeholder?: string
  label?: string
  options: { label: string; value: string }[]
  required?: boolean
}

function Select({
  value,
  onChange,
  className,
  label,
  options,
  required,
  placeholder,
}: Props) {
  return (
    <div className={className}>
      {label && <Label required={required}>{label}</Label>}
      <select
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full border-2 border-blue-400 p-2 focus:outline-none focus:ring-1 rounded-md focus:ring-blue-400 text-gray-700 font-semibold"
      >
        <option value="" className="text-gray-400 font-semibold mb-1">
          None
        </option>
        {options.map((option) => {
          return (
            <option
              value={option.value}
              className=" text-gray-700 font-semibold"
            >
              {option.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
