import { twMerge } from 'tailwind-merge'
import Label from './Label'
import { ChangeEvent, ForwardedRef, forwardRef } from 'react'

type Props = {
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
  label?: string
  required?: boolean
  error?: string
  defaultChecked?: boolean
}

const Checkbox = forwardRef(
  (
    { className, label, required, defaultChecked, error, ...rest }: Props,
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
          className="w-5 h-5 mt-1 ml-3 rounded-md"
          defaultChecked={defaultChecked}
          required={required}
          type="checkbox"
          ref={ref}
          {...rest}
        />
        {error && <span className="text-red-700">{error}</span>}
      </div>
    )
  },
)

export default Checkbox
