import React, { Fragment } from 'react'
import cn from 'classnames'

import './KeywordsResult.scss'

interface KeywordsResultProps {
  keywords: Record<string, string | undefined> | undefined
}

const KeywordsResult: React.FC<KeywordsResultProps> = ({ keywords }) => {
  return (
    <div
      className={cn('KeywordsResult', {
        loading: !keywords,
      })}
    >
      {keywords ? (
        Object.entries(keywords).map(([key, value]) => (
          <Fragment key={`${key}${value}`}>
            <span className="KeywordsResult-key">{`${key}：`}</span>
            <span className="KeywordsResult-value">{value}</span>
          </Fragment>
        ))
      ) : (
        <Fragment>
          <span className="KeywordsResult-key"></span>
          <span className="KeywordsResult-value"></span>
          <span className="KeywordsResult-key"></span>
          <span className="KeywordsResult-value"></span>
          <span className="KeywordsResult-key"></span>
          <span className="KeywordsResult-value"></span>
          <span className="KeywordsResult-key"></span>
          <span className="KeywordsResult-value"></span>
          <span className="KeywordsResult-key"></span>
          <span className="KeywordsResult-value"></span>
          <span className="KeywordsResult-key"></span>
          <span className="KeywordsResult-value"></span>
          <span className="KeywordsResult-key"></span>
          <span className="KeywordsResult-value"></span>
        </Fragment>
      )}
    </div>
  )
}

export default KeywordsResult
