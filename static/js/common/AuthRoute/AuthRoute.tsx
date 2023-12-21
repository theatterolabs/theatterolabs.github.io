import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { useAuth } from 'hooks'
import { Loading } from 'pages'

const AuthRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthenticated, authenticating } = useAuth()!

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : authenticating ? (
          <Loading />
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default AuthRoute
