import React, { forwardRef, Ref, DetailedHTMLProps, InputHTMLAttributes, ChangeEvent } from 'react'
import cn from 'classnames'

import './Uploader.scss'

interface UploaderProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onUpload?: (files: FileList | null, e: ChangeEvent<HTMLInputElement>) => void
  message?: string
}

const Uploader = forwardRef((props: UploaderProps, ref?: Ref<HTMLInputElement>) => {
  const { className, onChange, onUpload, message, ...otherProps } = props

  const onInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
    onUpload && onUpload(e.target.files, e)
    e.target.value = ''
  }

  return (
    <label className="Uploader">
      <input type="file" className={cn('Uploader-input', className)} ref={ref} onChange={onInputFile} {...otherProps} />
      {message ? <p className="Uploader-message">{message}</p> : null}
    </label>
  )
})

Uploader.displayName = 'Uploader'

export default Uploader
