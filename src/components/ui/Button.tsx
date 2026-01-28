import React from 'react'

type Variant = 'brand' | 'ghost' | 'plain'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export default function Button({ variant = 'brand', className = '', children, ...rest }: Props) {
  const base = 'inline-flex items-center justify-center font-medium'
  const variantClass = variant === 'brand' ? 'btn-brand' : variant === 'ghost' ? 'btn-ghost' : 'bg-transparent'

  return (
    <button className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  )
}
