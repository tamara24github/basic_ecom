import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const variants = {
  backgroundColor: {
    blueDark: 'bg-blue-950',
    blueLight: 'bg-blue-500',
    transparent: 'bg-transparent',
  },
  fontWeight: {
    bold: 'font-bold',
    semibold: 'font-semibold',
  },

  rounded: {
    md: 'rounded-md ',
    xl2: 'rounded-2xl',
    full: 'rounded-full',
  },
  hover: {
    blueDark: 'hover:bg-blue-950',
    blueLight: 'hover:bg-blue-500',
    transparent: 'hover:bg-transparent',
    red: 'hover:bg-red-600 hover:text-white',
    green: 'hover:bg-green-600 hover:text-white',
  },
  textColor: {
    white: 'text-white',
    red: 'text-red-600',
    green: 'text-green-600',
  },
}

type Props = {
  children?: ReactNode
  className?: string
  backgroundColor?: keyof typeof variants.backgroundColor
  fontWeight?: keyof typeof variants.fontWeight
  rounded?: keyof typeof variants.rounded
  hover?: keyof typeof variants.hover
  textColor?: keyof typeof variants.textColor
  onClick?: () => void
}
function Button({
  backgroundColor = 'transparent',
  children,
  className,
  fontWeight = 'semibold',
  hover = 'transparent',
  rounded = 'md',
  textColor = 'white',
  ...props
}: Props) {
  return (
    <button
      className={twMerge(
        variants.backgroundColor[backgroundColor],
        variants.fontWeight[fontWeight],
        variants.rounded[rounded],
        variants.hover[hover],
        variants.textColor[textColor],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
