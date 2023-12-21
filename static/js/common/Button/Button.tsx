import React, { forwardRef, Ref, DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import cn from 'classnames'

import './Button.scss'
import { Spinner } from 'common'

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  styleType?: 'primary' | 'outline'
  loading?: boolean
}

const Button = forwardRef((props: Props, ref?: Ref<HTMLButtonElement>) => {
  const { className, styleType = 'primary', loading, children, ...otherProps } = props

  return (
    <button
      className={cn('Button', styleType, className, {
        loading,
      })}
      ref={ref}
      {...otherProps}
    >
      <span className="Button-cover">
        <Spinner size="1.4em" strokeWidth={3} />
      </span>
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
