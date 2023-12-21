import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

import './AudioTaggerResult.scss'
import { AudioTaggerResponse } from 'utils'

interface AudioTaggerProps {
  result?: AudioTaggerResponse | undefined
}

const AudioTaggerResult: React.FC<AudioTaggerProps> = ({ result }) => {
  const { t } = useTranslation('audioTagger')

  return (
    <div
    className={cn('AudioTaggerResult', {
      loading: !result,
    })}
  >
      {
        result ? (
        <>
          <Fragment>
            <span className="AudioTaggerResult-value">{t(result[0].tagType) + `: ` + result[0].tag}</span>
              <span className="AudioTaggerResult-value">{t(result[1].tagType) + `: ` + result[1].tag}</span>
              <span className="AudioTaggerResult-value">{t(result[2].tagType) + `: ` + result[2].tag}</span>
          </Fragment>
        </>
      ) : (
        <Fragment>
          <span className="AudioTaggerResult-value"></span>
        </Fragment>
      )}
    </div>
  )
}

export default AudioTaggerResult
