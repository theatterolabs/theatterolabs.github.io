import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import cn from 'classnames'

import './Auth.scss'
import { Button, Input } from 'common'
import { axios, TOKEN_GATEWAY_ACCESS_CODE, TOKEN_GATEWAY, CONFIG_GATEWAY, CDN_COS } from 'utils'
import { useAuth } from 'hooks'

const bannerURL = `${CDN_COS}/assets/image/auth_banner.jpg`

const Auth: React.FC = () => {
  const { t } = useTranslation()

  const { isAuthenticated, setIsAuthenticated } = useAuth()!

  const history = useHistory()
  const location = useLocation()

  const [messageVisible, setMessageVisible] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const onInputChange = useCallback((value: string) => {
    setInputValue(value)

    setMessageVisible(false)
  }, [])

  const onSubmit = useCallback(async () => {
    if (isAuthenticating) return

    try {
      setIsAuthenticating(true)

      const jwt = (
        await axios().post(TOKEN_GATEWAY, {
          access_code: TOKEN_GATEWAY_ACCESS_CODE,
          action: 'Login',
          product: 'SmartContent_Demo',
          token: inputValue.trim(),
        })
      ).data.jwt
      if(!jwt) {
        throw new Error('Login failed')
      }
      localStorage.setItem('jwt', jwt)

      const userId = (
        await axios().post(TOKEN_GATEWAY, {
          access_code: TOKEN_GATEWAY_ACCESS_CODE,
          action: 'Validate',
          product: 'SmartContent_Demo',
          jwt: localStorage.getItem('jwt'),
        })
      ).data.role
      if(!userId) {
        throw new Error('Validate failed')
      }
      localStorage.setItem('userId', userId)

      const authConfig = (await axios().post(CONFIG_GATEWAY, { userId })).data
      localStorage.setItem('config', authConfig)
      const authContent = JSON.parse(Buffer.from(authConfig || '', 'base64').toString('ascii'))

      setIsAuthenticated(true)
      if (authContent.home) {
        history.push(authContent.home)
      } else {
        history.push(location.state.from || '/')
      }
    } catch {
      setMessageVisible(true)
      setIsAuthenticating(false)
    }
  }, [isAuthenticating, inputValue, setIsAuthenticated, history, location.state.from])

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.keyCode) {
        case 13:
          onSubmit()
          break
        default:
          break
      }
    },
    [onSubmit],
  )

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <div
      className="Auth"
      style={{
        backgroundImage: `url(${bannerURL})`,
      }}
    >
      <div className="Auth-content">
        <div className="Auth-form">
          <Input
            placeholder={t`tip.inputToken`}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <Button loading={isAuthenticating} onClick={onSubmit}>{t`btn.enter`}</Button>
        </div>
        <div
          className={cn('Auth-message', {
            visible: messageVisible,
          })}
        >{t`tip.invalidToken`}</div>
      </div>
    </div>
  )
}

export default Auth
