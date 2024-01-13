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
  },
  textColor: {
    white: 'text-white',
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
}
function Button({
  backgroundColor = 'transparent',
  fontWeight = 'semibold',
  rounded = 'md',
  hover = 'transparent',
  textColor = 'white',
  className,
  children,
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
    >
      {children}
    </button>
  )
}

export default Button
