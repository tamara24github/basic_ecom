import { ForwardedRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'

type Props = {
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
  label?: string
  required?: boolean
  defaultChecked?: boolean
}

const Checkbox = forwardRef(
  (
    { className, label, required, defaultChecked, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className={twMerge(className, 'flex items-baseline mb-4 mt-2')}>
        {label && (
          <Label required={required} className="mb-0">
            {label}
          </Label>
        )}
        <input
          defaultChecked={defaultChecked}
          required={required}
          type="checkbox"
          className="w-5 h-5 mt-1 ml-3 rounded-md"
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

export default Checkbox
