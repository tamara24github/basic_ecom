import { ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { IoSearchOutline } from 'react-icons/io5'

type Props = {
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
  placeholder?: string
}

function TextField({
  className,
  onChange,
  value,
  placeholder,
  ...props
}: Props) {
  return (
    <div className={twMerge(className, ' relative  flex items-center')}>
      <IoSearchOutline className="absolute left-3 w-4 h-4 text-blue-600" />
      <input
        className="pl-9 block md:w-[600px] w-full px-3 py-2 border-2 border-blue-400 focus:outline-none focus:ring-1 rounded-md focus:ring-blue-400 "
        {...props}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextField
