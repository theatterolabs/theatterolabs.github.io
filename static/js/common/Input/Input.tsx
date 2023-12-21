import React, { forwardRef, Ref, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import cn from 'classnames'

import './Input.scss'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  styleType?: 'primary' | 'outline'
}

const Input = forwardRef((props: Props, ref?: Ref<HTMLInputElement>) => {
  const { className, ...otherProps } = props

  return <input className={cn('Input', className)} ref={ref} {...otherProps} />
})

Input.displayName = 'Input'

export default Input
