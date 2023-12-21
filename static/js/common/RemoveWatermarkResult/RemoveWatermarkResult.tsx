import React, { Fragment } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import './RemoveWatermarkResult.scss'
import { RemoveWatermarkResponse } from 'utils'

interface RemoveWatermarkProps {
  result?: RemoveWatermarkResponse | undefined
}

const RemoveWatermarkResult: React.FC<RemoveWatermarkProps> = ({ result }) => {
  const { t } = useTranslation()
  const infos: string[] = []

  if (result?.watermarkInfos) {
    for (let i = 0; i < result?.watermarkInfos.length; i++) {
      infos.push(result?.watermarkInfos[i].content)
    }
  }
    
  const results = infos?.map((res) => <div>{res}</div>)

  return (
    <div
      className={cn('RemoveWatermarkResult', {
        loading: !result,
      })}
    >
      {
        result ? (result.watermarkInfos ?
        (<>
          <Fragment>
            <span className="RemoveWatermarkResult-value">{results}</span>
          </Fragment>
        </>) : 
        (
        <Fragment>
            <span className="RemoveWatermarkResult-value">{t`watermarkUnsupported`}</span>
        </Fragment>)
        ) :
        (
            <Fragment>
              <span className="RemoveWatermarkResult-value"></span>
            </Fragment>
        )}
    </div>
  )
}

export default RemoveWatermarkResult
