import { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { IoSearchOutline } from 'react-icons/io5'

type Props = {
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
  placeholder?: string
  classNameInput?: string
}

function TextField({
  className,
  onChange,
  value,
  placeholder,
  classNameInput,
  ...props
}: Props) {
  return (
    <div className={twMerge(' relative  flex items-center', className)}>
      <IoSearchOutline className="absolute left-3 w-4 h-4 text-blue-600" />
      <input
        className={twMerge(
          'pl-9 block  w-full  pr-3 py-2 border-2 border-blue-400 focus:outline-none focus:ring-1 rounded-md focus:ring-blue-400 ',
          classNameInput,
        )}
        {...props}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextField
