import React from 'react'
import cn from 'classnames'

import './TabPane.scss'

export type TabPaneProps = {
  title: string
  paneKey: React.ReactText
  active?: boolean
  prerender?: boolean
}

const TabPane: React.FC<TabPaneProps> = ({ children, active }) => {
  return (
    <li
      className={cn('Tabpane', {
        active,
      })}
    >
      {children}
    </li>
  )
}

export default TabPane
