import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import './Footer.scss'
import { CDN_COS } from 'utils'

const logoURL = `${CDN_COS}/assets/image/logo.png`
const Footer: FC = () => {
  const { t } = useTranslation()
  const year = new Date().getFullYear();

  return (
    <footer className="Footer">
      <div className="Footer-content">
        <div className="Footer-brand">
          <a className="Footer-logo" href="https://multimedia.tencent.com" target="_blank" rel="noopener noreferrer">
            <img src={logoURL} alt={t`lab`} />
          </a>
          <p className="Footer-copyright">{`© ${year} ${t`lab`}`}</p>
        </div>
        <div className="Footer-info">
          <section className="Footer-info-block">
            <h3 className="Footer-info-title">{t`contactUs`}</h3>
            <ul className="Footer-info-list">
              <li>
                <a href="mailto:medialab@tencent.com">medialab@tencent.com</a>
              </li>
              <li>
                <a href="https://multimedia.tencent.com/contact" target="_blank" rel="noopener noreferrer">
                  https://multimedia.tencent.com/contact
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </footer>
  )
}

export default Footer
