import { twMerge } from 'tailwind-merge'
import Label from './Label'

type Props = {
  className?: string
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void
  value?: boolean
  label?: string
  required?: boolean
}

function Checkbox({ className, onClick, value, label, required }: Props) {
  return (
    <div className={twMerge(className, 'flex items-baseline mb-4 mt-2')}>
      {label && (
        <Label required={required} className="mb-0">
          {label}
        </Label>
      )}
      <input
        required={required}
        type="checkbox"
        className="w-5 h-5 mt-1 ml-3 rounded-md"
        onClick={onClick}
        checked={value}
      />
    </div>
  )
}

export default Checkbox
