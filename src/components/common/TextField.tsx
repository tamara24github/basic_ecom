import { twMerge } from 'tailwind-merge'

type Props = {
  label?: string
  className?: string
}

function TextField({ label, className, ...props }: Props) {
  return (
    <div className={twMerge(className)}>
      <label>{label}</label>
      <div>
        <input {...props} />
      </div>
    </div>
  )
}

export default TextField
