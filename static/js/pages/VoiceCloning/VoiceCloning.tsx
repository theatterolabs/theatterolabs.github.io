import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import './VoiceCloning.scss'
import { CDN_COS } from 'utils'
import GenerateAudio from './component/GenerateAudio'
import TrainingModel from './component/TrainingModel'

const bannerURL = `${CDN_COS}/assets/image/back3.jpg`

const VoiceCloning: React.FC = () => {


  const { t } = useTranslation('voiceCloning')

  const [tabType, setTabType] = useState<string>('audio')

  const switchTab = (type: string) => {
    setTabType(type)
  }

  return (
    <div className="VoiceCloning">
      <div
        className="VoiceCloning-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="VoiceCloning-banner-content">
          <h2 className="VoiceCloning-banner-title">{t`voiceCloning`}</h2>
          <p className="VoiceCloning-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="VoiceCloning-demo">
        <div className="VoiceCloning-demo-tab">
          <span className={tabType === 'audio' ? 'active' : ''} onClick={() => switchTab('audio')}>{t`generateAudio`}</span>
          <span> / </span>
          <span className={tabType === 'model' ? 'active' : ''} onClick={() => switchTab('model')}>{t`trainModel`}</span>
        </div>

        {tabType === 'audio' && (
          <GenerateAudio></GenerateAudio>
        )}

        {tabType === 'model' && (
          <TrainingModel></TrainingModel>
        )}
      </div>
    </div>
  )
}

export default VoiceCloning
