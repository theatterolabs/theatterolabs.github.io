import React, { Fragment } from 'react'
import cn from 'classnames'

import './CaptionResult.scss'
interface CaptionProps {
  result?: string | undefined
}

const CaptionResult: React.FC<CaptionProps> = ({ result }) => {
  return (
    <div
      className={cn('CaptionResult', {
        loading: !result,
      })}
    >
      {result ? (
        <>
          <Fragment>
            <span className="CaptionResult-value">{result}</span>
          </Fragment>
        </>
      ) : (
        <Fragment>
          {/* <span className="ArticleResult-key"></span> */}
          <span className="CaptionResult-value"></span>
          {/* <span className="ArticleResult-key"></span> */}
          <span className="CaptionResult-value"></span>
        </Fragment>
      )}
    </div>
  )
}

export default CaptionResult
