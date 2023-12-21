import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'

import './Header.scss'
import { useAuth } from 'hooks'

import { CDN_COS } from 'utils'

const logoURL = `${CDN_COS}/assets/image/logo.png`

type MenuItem = {
  path: string
  tag?: string
}

const MENU = {
  smartWriter: [
    {
      path: 'imageDescription',
    },
    {
      path: 'imageCaption',
    },
    {
      path: 'videoDescription',
    },
    {
      path: 'videoCaption',
    },
    {
      path: 'wzry',
    },
    {
      path: 'lyrics',
    },
    {
      path: 'ocr',
      tag: 'Beta',
    },
  ],
  smartProducer: [
    {
      path: 'videoMusic',
    },
    {
      path: 'musicVideo',
    },
    {
      path: 'football',
    },
    {
      path: 'smartCover',
    },
    {
      path: 'removeWatermark',
      tag: 'Beta',
    },
    {
      path: 'imageEnhancement',
    },
  ],
  smartMusician: [
    {
      path: 'genreTransform',
      tag: 'Beta',
    },
    {
      path: 'instrumentTransform',
    },
    {
      path: 'seperateTransform',
    },
    {
      path: 'musicBeat',
    },
    {
      path: 'musicHighlight',
    },
    {
      path: 'audioTagger',
      tag: 'Beta',
    },
  ],
} as {
  [key: string]: MenuItem[]
}

const Header: React.FC = () => {
  const { t, i18n } = useTranslation()

  const { isAuthenticated } = useAuth()!

  const onChangeLang = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang)
    },
    [i18n],
  )

  const location = useLocation()

  const [offsetLeft, setOffsetLeft] = useState('20vw')
  const [activeMenu, setActiveMenu] = useState('')
  const [navExpended, setNavExpended] = useState(false)

  const authKey = Buffer.from(localStorage.getItem('config') || '', 'base64').toString('ascii')
  const ban = JSON.parse(authKey || '{}').ban || []

  const onMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, menuName: string) => {
    const target = e.target as HTMLButtonElement

    const centerPos = target.offsetLeft + target.clientWidth / 2

    setOffsetLeft(`calc(${centerPos}px - 50%)`)
    setActiveMenu(menuName)
    setNavExpended(true)
  }, [])

  const onContentMouseEnter = useCallback(() => {
    setNavExpended(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setNavExpended(false)
  }, [])

  return (
    <header
      className={cn('Header', {
        expended: navExpended,
        // expended: true,
      })}
    >
      <div className="Header-wrapper">
        <div className="Header-head">
          <a className="Header-logo" href="https://multimedia.tencent.com" target="_blank" rel="noopener noreferrer">
            <img src={logoURL} alt="Tencent Media Experience" />
          </a>
          |
          <h1 className="Header-title">
            <Link className="Header-title-link" to="/">{t`smartContent`}</Link>
          </h1>
        </div>

        {isAuthenticated ? (
          <nav className={cn('Header-nav')}>
            {Object.keys(MENU).map((menuName) => (
              <button
                key={menuName}
                className={cn('Header-nav-holder', {
                  active: menuName === activeMenu,
                  hidden: ban.includes('all') || ban.includes(menuName),
                })}
                onMouseEnter={(e) => onMouseEnter(e, menuName)}
                onMouseLeave={onMouseLeave}
              >
                {t(menuName)}
              </button>
            ))}
          </nav>
        ) : null}

        <div className="Header-lang">
          <button
            className={cn('Header-lang-btn', {
              active: i18n.language === 'zh',
            })}
            onClick={() => onChangeLang('zh')}
          >
            中
          </button>
          <span className="Header-lang-divider">/</span>
          <button
            className={cn('Header-lang-btn', {
              active: i18n.language === 'en',
            })}
            onClick={() => onChangeLang('en')}
          >
            EN
          </button>
        </div>
      </div>

      <div className="Header-submenu" onMouseEnter={onContentMouseEnter} onMouseLeave={onMouseLeave}>
        <div
          className="Header-submenu-content"
          style={{
            transform: `translateX(${offsetLeft})`,
          }}
        >
          <div
            className={cn('Header-submenu-inner', {
              active: 'smartWriter' === activeMenu,
            })}
          >
            <div className={cn('Header-submenu-block')}>
              <h5
                className={cn('Header-submenu-title', {
                  hidden: ban.includes('all') || ban.includes('imageDir'),
                })}
              >
                {t('imageDir')}
              </h5>
              <nav className="Header-submenu-list">
                {/* <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/imageDescription',
                    hidden: ban.includes('all') || ban.includes('imageDescription'),
                  })}
                  to={`/imageDescription`}
                >
                  {t('imageDescription')}
                </Link> */}
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/imageCaption',
                    hidden: ban.includes('all') || ban.includes('imageCaption'),
                  })}
                  to={`/imageCaption`}
                >
                  {t('imageCaption')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/ocr',
                    hidden: ban.includes('all') || ban.includes('ocr'),
                  })}
                  to={`/ocr`}
                >
                  {t('ocr')}
                  <span className="Header-submenu-link-tag">{'Beta'}</span>
                </Link>
              </nav>
            </div>
            <div className={cn('Header-submenu-block')}>
              <h5
                className={cn('Header-submenu-title', {
                  hidden: ban.includes('all') || ban.includes('videoDir'),
                })}
              >
                {t('videoDir')}
              </h5>
              <nav className="Header-submenu-list">
                {/* <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/videoDescription',
                    hidden: ban.includes('all') || ban.includes('videoDescription'),
                  })}
                  to={`/videoDescription`}
                >
                  {t('videoDescription')}
                </Link> */}
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/videoCaption',
                    hidden: ban.includes('all') || ban.includes('videoCaption'),
                  })}
                  to={`/videoCaption`}
                >
                  {t('videoCaption')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/wzry',
                    hidden: ban.includes('all') || ban.includes('wzry'),
                  })}
                  to={`/wzry`}
                >
                  {t('wzry')}
                </Link>
              </nav>
            </div>
            <div className={cn('Header-submenu-block')}>
              <h5
                className={cn('Header-submenu-title', {
                  hidden: ban.includes('all') || ban.includes('musicDir'),
                })}
              >
                {t('musicDir')}
              </h5>
              <nav className="Header-submenu-list">
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/lyrics',
                    hidden: ban.includes('all') || ban.includes('lyrics'),
                  })}
                  to={`/lyrics`}
                >
                  {t('lyrics')}
                </Link>
              </nav>
            </div>
          </div>
          <div
            className={cn('Header-submenu-inner', {
              active: 'smartProducer' === activeMenu,
            })}
          >
            <div className={cn('Header-submenu-block')}>
              <nav className="Header-submenu-list">
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/videoMusic',
                    hidden: ban.includes('all') || ban.includes('videoMusic'),
                  })}
                  to={`/videoMusic`}
                >
                  {t('videoMusic')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/musicVideo',
                    hidden: ban.includes('all') || ban.includes('musicVideo'),
                  })}
                  to={`/musicVideo`}
                >
                  {t('musicVideo')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/football',
                    hidden: ban.includes('all') || ban.includes('football'),
                  })}
                  to={`/football`}
                >
                  {t('football')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/gva',
                    hidden: ban.includes('all') || ban.includes('gva'),
                  })}
                  to={`/gva`}
                >
                  {t('gva')}
                </Link>
              </nav>
            </div>
            <div className={cn('Header-submenu-block')}>
              <nav className="Header-submenu-list">
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/videoCrop',
                    hidden: ban.includes('all') || ban.includes('videoCrop'),
                  })}
                  to={`/videoCrop`}
                >
                  {t('videoCrop')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/smartCover',
                    hidden: ban.includes('all') || ban.includes('smartCover'),
                  })}
                  to={`/smartCover`}
                >
                  {t('smartCover')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/removeWatermark',
                    hidden: ban.includes('all') || ban.includes('removeWatermark'),
                  })}
                  to={`/removeWatermark`}
                >
                  {t('removeWatermark')}
                  <span className="Header-submenu-link-tag">{'Beta'}</span>
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/smartVlog',
                    hidden: ban.includes('all') || ban.includes('smartVlog'),
                  })}
                  to={`/smartVlog`}
                >
                  {t('smartVlog')}
                </Link>
              </nav>
            </div>
            <div className={cn('Header-submenu-block')}>
              <nav className="Header-submenu-list">

                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/imageScene',
                    hidden: ban.includes('all') || ban.includes('imageScene'),
                  })}
                  to={`/imageScene`}
                >
                  {t('imageScene')}
                </Link>

                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/imageObject',
                    hidden: ban.includes('all') || ban.includes('imageObject'),
                  })}
                  to={`/imageObject`}
                >
                  {t('imageObject')}
                </Link>

                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/videoScene',
                    hidden: ban.includes('all') || ban.includes('videoScene'),
                  })}
                  to={`/videoScene`}
                >
                  {t('videoScene')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/videoObject',
                    hidden: ban.includes('all') || ban.includes('videoObject'),
                  })}
                  to={`/videoObject`}
                >
                  {t('videoObject')}
                </Link>
              </nav>
            </div>
            <div className={cn('Header-submenu-block')}>
              <nav className="Header-submenu-list">
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/imageEnhancement',
                    hidden: ban.includes('all') || ban.includes('imageEnhancement'),
                  })}
                  to={`/imageEnhancement`}
                >
                  {t('imageEnhancement')}
                </Link>
              </nav>
            </div>
          </div>
          <div
            className={cn('Header-submenu-inner', {
              active: 'smartMusician' === activeMenu,
            })}
          >
            <div className={cn('Header-submenu-block')}>
              <nav className="Header-submenu-list">
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/genreTransform',
                    hidden: ban.includes('all') || ban.includes('genreTransform'),
                  })}
                  to={`/genreTransform`}
                >
                  {t('genreTransform')}
                  <span className="Header-submenu-link-tag">{'Beta'}</span>
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/instrumentTransform',
                    hidden: ban.includes('all') || ban.includes('instrumentTransform'),
                  })}
                  to={`/instrumentTransform`}
                >
                  {t('instrumentTransform')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/seperateTransform',
                    hidden: ban.includes('all') || ban.includes('seperateTransform'),
                  })}
                  to={`/seperateTransform`}
                >
                  {t('seperateTransform')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/audioTagger',
                    hidden: ban.includes('all') || ban.includes('audioTagger'),
                  })}
                  to={`/audioTagger`}
                >
                  {t('audioTagger')}
                  <span className="Header-submenu-link-tag">{'Beta'}</span>
                </Link>
              </nav>
            </div>
            <div className={cn('Header-submenu-block')}>
              <h5
                className={cn('Header-submenu-title', {
                  hidden: ban.includes('all') || ban.includes('BeatDir'),
                })}
              >
                {t('BeatDir')}
              </h5>
              <nav className="Header-submenu-list">
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/musicBeat',
                    hidden: ban.includes('all') || ban.includes('musicBeat'),
                  })}
                  to={`/musicBeat`}
                >
                  {t('musicBeat')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/musicHighlight',
                    hidden: ban.includes('all') || ban.includes('musicHighlight'),
                  })}
                  to={`/musicHighlight`}
                >
                  {t('musicHighlight')}
                </Link>
              </nav>
            </div>
            <div className={cn('Header-submenu-block')}>
              <nav className="Header-submenu-list">
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/imageComposition',
                    hidden: ban.includes('all') || ban.includes('imageComposition'),
                  })}
                  to={`/imageComposition`}
                >
                  {t('imageComposition')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/videoComposition',
                    hidden: ban.includes('all') || ban.includes('videoComposition'),
                  })}
                  to={`/videoComposition`}
                >
                  {t('videoComposition')}
                </Link>

                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/singingConversion',
                    hidden: ban.includes('all') || ban.includes('singingConversion'),
                  })}
                  to={`/singingConversion`}
                >
                  {t('singingConversion')}
                </Link>
                <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/voiceCloning',
                    hidden: ban.includes('all') || ban.includes('voiceCloning'),
                  })}
                  to={`/voiceCloning`}
                >
                  {t('voiceCloning')}
                </Link>
                {/* <Link
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/musicHighlight',
                    hidden: ban.includes('all') || ban.includes('musicHighlight'),
                  })}
                  to={`/musicHighlight`}
                >
                  {t('musicHighlight')}
                </Link> */}
              </nav>
            </div>
          </div>
          {/* {Object.entries(MENU).map(([menuName, menuList]) => (
            <nav
              key={menuName}
              className={cn('Header-submenu-list', {
                active: menuName === activeMenu,
              })}
            >
              {menuList.map(({ path, tag }) => (
                <Link
                  key={path}
                  className={cn('Header-submenu-link', {
                    active: location.pathname === '/' + path,
                  })}
                  to={`/${path}`}
                >
                  {t(path)}
                  {tag && <span className="Header-submenu-link-tag">{tag}</span>}
                </Link>
              ))}
            </nav>
          ))} */}
        </div>
      </div>
    </header>
  )
}

export default Header
