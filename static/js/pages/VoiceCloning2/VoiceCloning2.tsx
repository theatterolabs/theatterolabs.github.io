import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './VoiceCloning2.scss'
import { CDN_COS } from 'utils'
import GenerateAudio from './component/GenerateAudio'

const bannerURL = `${CDN_COS}/assets/image/back3.jpg`

const VoiceCloning: React.FC = () => {

  const { t } = useTranslation('voiceCloning2')

  return (
    <div className="VoiceCloning">
      <div
        className="VoiceCloning-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="VoiceCloning-banner-content">
          <h2 className="VoiceCloning-banner-title">{t`voiceCloning2`}</h2>
          <p className="VoiceCloning-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="VoiceCloning-demo">
        <div className="VoiceCloning-demo-tab">
          <span className="active">{t`generateAudio`}</span>
        </div>

        <GenerateAudio></GenerateAudio>

      </div>
    </div>
  )
}

export default VoiceCloning
