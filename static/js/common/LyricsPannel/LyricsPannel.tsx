import React, { Fragment } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import './LyricsPannel.scss'
import { LyricsResponse } from 'utils'
interface LyricsProps {
  result: LyricsResponse | undefined
}

const LyricsPannel: React.FC<LyricsProps> = ({ result }) => {
  const { t } = useTranslation()
  return (
    <div
      className={cn('LyricsPannel', {
        loading: !result,
      })}
    >
      {result ? (
        [
          <Fragment key={`head`}>
            <span className="LyricsPannel-key">{t`lyricsPannel.head`}</span>
            <span className="LyricsPannel-value">{`${result.head}`}</span>
          </Fragment>,
          <Fragment key={`pattern`}>
            {/* <span className="LyricsPannel-key">{t`lyricsPannel.pattern`}</span>
              <span className="LyricsPannel-value">{result.pattern}</span> */}
            <span className="LyricsPannel-key"></span>
            <span className="LyricsPannel-value"></span>
          </Fragment>,
          <Fragment key={`lyric$`}>
            <span className="LyricsPannel-key">{t`lyricsPannel.lyric`}</span>
            <span className="LyricsPannel-value">{result.lyricResult}</span>
          </Fragment>,
          <Fragment key={`rap`}>
            <span className="LyricsPannel-key">{t`lyricsPannel.rap`}</span>
            <span className="LyricsPannel-value">{result.rapResult}</span>
          </Fragment>,
        ]
      ) : (
        <Fragment>
          <span className="LyricsPannel-key"></span>
          <span className="LyricsPannel-value"></span>
          <span className="LyricsPannel-key"></span>
          <span className="LyricsPannel-value"></span>
          <span className="LyricsPannel-key"></span>
          <span className="LyricsPannel-value"></span>
          <span className="LyricsPannel-key"></span>
          <span className="LyricsPannel-value"></span>
        </Fragment>
      )}
    </div>
  )
}

export default LyricsPannel
