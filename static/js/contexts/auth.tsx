import React, { useState, useEffect } from 'react'

import { axios, TOKEN_GATEWAY, IP_FILTER_URL, TOKEN_GATEWAY_ACCESS_CODE, CONFIG_GATEWAY } from 'utils'

type AuthContextType = {
  isAuthenticated: boolean
  authenticating: boolean
  setIsAuthenticated: (value: boolean) => void
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authenticating, setAuthenticating] = useState(true)

  useEffect(() => {
    async function request() {
      try {
        await axios()
          .post(IP_FILTER_URL, {
            product: 'SmartContent',
          })
          .catch(({ response }) => {
            if (response && response.status === 503) {
              throw response.data
            }
          })

        await axios().post(TOKEN_GATEWAY, {
          access_code: TOKEN_GATEWAY_ACCESS_CODE,
          action: 'Validate',
          product: 'SmartContent_Demo',
          jwt: localStorage.getItem('jwt'),
        })

        localStorage.setItem(
          'config',
          (await axios().post(CONFIG_GATEWAY, { userId: localStorage.getItem('userId') })).data,
        )

        setIsAuthenticated(true)
      } catch (e) {
        console.log(e)
      }

      setAuthenticating(false)
    }

    request()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticating, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
