import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const variants = {
  size: { xs: 'text-xs', sm: 'text-sm', md: 'text-md' },
  weight: {
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
  color: {
    blueDark: 'text-blue-950',
    blueLight: 'text-blue-500',
    black: 'text-black',
    white: 'text-white',
  },
}

type Props = {
  children?: ReactNode
  className?: string
  size?: keyof typeof variants.size
  weight?: keyof typeof variants.weight
  color?: keyof typeof variants.color
}

function Paragraph({
  size = 'sm',
  color = 'black',
  weight = 'normal',
  className,
  children,
}: Props) {
  return (
    <p
      className={twMerge(
        variants.size[size],
        variants.color[color],
        variants.weight[weight],
        className,
      )}
    >
      {children}
    </p>
  )
}

export default Paragraph
