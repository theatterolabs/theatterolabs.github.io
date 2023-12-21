import React, { useState, useRef } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import './Football.scss'
import { FootballType } from 'types'
import { CDN_COS } from 'utils'
const bannerURL = `${CDN_COS}/assets/image/back7.jpg`

const footballs: FootballType[] = ['original', 'fast', 'slow', 'corner', 'free']

const demo = {
  original: 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/football/original.mp4',
  fast: 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/football/fast.mp4',
  slow: 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/football/slow.mp4',
  corner: 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/football/corner.mp4',
  free: 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/football/free.mp4',
}

const Football: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [videoSource, setVideoSource] = useState(demo.original)

  const { t } = useTranslation('football')

  return (
    <div className="Football">
      <div
        className="Football-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="Football-banner-content">
          <h2 className="Football-banner-title">{t`football`}</h2>
          <p className="Football-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="Football-demo">
        <p>{`* ${t`supportsTip`}`}</p>

        <div className="Football-main">
          <div className="Football-result">
            <video src={videoSource} controls controlsList="nodownload" ref={videoRef}></video>
          </div>

          <div className="Football-type">
            <ul className="Football-type-list">
              {footballs.map((type) => (
                <li
                  key={type}
                  className={cn('Football-type-item', {
                    active: demo[type] === videoSource,
                  })}
                  onClick={() => setVideoSource(demo[type])}
                >
                  {t(`footballType.${type}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Football
