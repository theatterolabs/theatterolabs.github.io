import React, { Fragment } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import './WzryResult.scss'
import { WzryHighlight } from 'utils'
interface WzryResultProps {
  results?: WzryHighlight[] | undefined
}

const WzryResult: React.FC<WzryResultProps> = ({ results }) => {
  const { t } = useTranslation()
  return (
    <div
      className={cn('WzryResult', {
        loading: !results,
      })}
    >
      {results?.length ? (
        results.map((highligh, index) => {
          return [
            <Fragment key={`time${index}`}>
              <span className="WzryResult-key">{t`wzryResult.time`}</span>
              <span className="WzryResult-value">{`${parseFloat(highligh.begin).toFixed(1)}s - ${parseFloat(
                highligh.end,
              ).toFixed(1)}s`}</span>
            </Fragment>,
            <Fragment key={`tag${index}`}>
              <span className="WzryResult-key">{t`wzryResult.tag`}</span>
              <span className="WzryResult-value">{highligh.tag.join(', ')}</span>
            </Fragment>,
            <Fragment key={`caption${index}`}>
              <span className="WzryResult-key">{t`wzryResult.caption`}</span>
              <span className="WzryResult-value">{highligh.caption}</span>
            </Fragment>,
            <Fragment key={`barrage${index}`}>
              <span className="WzryResult-key">{t`wzryResult.barrage`}</span>
              <span className="WzryResult-value">{highligh.barrage.join('; ')}</span>
            </Fragment>,
          ]
        })
      ) : (
        <Fragment>
          <span className="WzryResult-key"></span>
          <span className="WzryResult-value"></span>
          <span className="WzryResult-key"></span>
          <span className="WzryResult-value"></span>
          <span className="WzryResult-key"></span>
          <span className="WzryResult-value"></span>
          <span className="WzryResult-key"></span>
          <span className="WzryResult-value"></span>
        </Fragment>
      )}
    </div>
  )
}

export default WzryResult
