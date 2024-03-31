import { twMerge } from 'tailwind-merge'
import Label from './Label'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  placeholder?: string
  rows?: number
  label?: string
  required?: boolean
}

function TextArea({
  value,
  onChange,
  className,
  placeholder,
  rows,
  label,
  required,
}: Props) {
  return (
    <div className={className}>
      {label && <Label required={required}>{label}</Label>}
      <textarea
        required={required}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={twMerge(
          'resize-none w-full p-2 border-2 border-blue-400 focus:outline-none focus:ring-1 rounded-md focus:ring-blue-400 text-gray-700 font-semibold',
        )}
      />
    </div>
  )
}

export default TextArea
