import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const variants = {
  fontSize: {
    normal: 'text-base',
    large: 'text-lg',
    xl: 'text-xl',
    xl2: 'text-2xl',
    xl5: 'text-5xl',
  },
  fontWeight: {
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extraBold: ' font-extrabold',
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
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  fontSize?: keyof typeof variants.fontSize
  fontWeight?: keyof typeof variants.fontWeight
  color?: keyof typeof variants.color
}

function Heading({
  fontSize = 'normal',
  fontWeight = 'normal',
  color = 'black',
  as: Tag = 'h1',
  children,
  className,
}: Props) {
  return (
    <Tag
      className={twMerge(
        variants.fontSize[fontSize],
        variants.color[color],
        variants.fontWeight[fontWeight],
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export default Heading
