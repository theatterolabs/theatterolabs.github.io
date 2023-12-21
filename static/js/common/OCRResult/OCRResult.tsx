import React, { Fragment } from 'react'
import cn from 'classnames'


import './OCRResult.scss'
interface OCRProps {
  result?: string[] | undefined
}

const OCRResult: React.FC<OCRProps> = ({ result }) => {
  const results = result?.map((res) => <div>{res}</div>)

  return (
    <div
      className={cn('OCRResult', {
        loading: !result,
      })}
    >
      {result ? (
        <>
          <Fragment>
            <span className="OCRResult-value">{results}</span>
          </Fragment>
        </>
      ) : (
        <Fragment>
          <span className="OCRResult-value"></span>
        </Fragment>
      )}
    </div>
  )
}

export default OCRResult
