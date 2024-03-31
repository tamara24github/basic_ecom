import { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { IoSearchOutline } from 'react-icons/io5'
import Label from './Label'

type Props = {
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
  placeholder?: string
  classNameInput?: string
  withIcon?: boolean
  label?: string
  required?: boolean
}

function TextField({
  className,
  onChange,
  value,
  placeholder,
  withIcon,
  classNameInput,
  label,
  required,
  ...props
}: Props) {
  return (
    <div className={className}>
      {label && <Label required={required}>{label}</Label>}
      <div className=" relative flex items-center">
        {withIcon && (
          <IoSearchOutline className="absolute left-3 w-4 h-4 text-blue-600" />
        )}
        <input
          required={required}
          className={twMerge(
            ' block  w-full  px-3 py-2 border-2 border-blue-400 focus:outline-none focus:ring-1 rounded-md focus:ring-blue-400  text-gray-700 font-semibold',
            withIcon && 'pl-9',
            classNameInput,
          )}
          {...props}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default TextField
