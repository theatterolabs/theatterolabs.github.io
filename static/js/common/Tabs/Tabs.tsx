import React, { cloneElement, useState, ReactElement, Fragment, useEffect, useRef } from 'react'
import cn from 'classnames'

import './Tabs.scss'
import TabPanel, { TabPaneProps } from './TabPane'

function isComponent(children: React.ReactNode) {
  return children instanceof Object
}

function getTabPanes(children: React.ReactNode) {
  const panes = [] as React.ReactElement<TabPaneProps>[]

  if (!isComponent(children)) return []

  Array.isArray(children)
    ? children
        .filter((child) => (child as React.ReactElement).props.title)
        .map((child) => panes.push(child as ReactElement))
    : panes.push(children as ReactElement)

  return panes
}

interface TabsComponentProps {
  activeKey?: React.ReactText
  zIndex?: number
  onChange?: (pane: React.ReactText) => void
}

interface TabsComponent extends React.FC<TabsComponentProps> {
  TabPane: typeof TabPanel
}

const Tabs: TabsComponent = ({ children, activeKey, zIndex, onChange }) => {
  const renderMapRef = useRef<Map<React.ReactText, boolean>>(new Map())
  const panes = getTabPanes(children)

  const [activePaneKey, setActivePaneKey] = useState(panes[0].props.paneKey || '')

  useEffect(() => {
    const renderMap = renderMapRef.current

    if (activeKey) {
      renderMap.has(activeKey) || renderMap.set(activeKey, true)
    } else {
      renderMap.has(activePaneKey) || renderMap.set(activePaneKey, true)
    }
  }, [activeKey, activePaneKey])

  return (
    <div className="Tabs">
      <nav className="Tabs-nav" style={{ zIndex: zIndex }}>
        {panes.map(({ props: { title, paneKey } }) => (
          <button
            key={paneKey}
            className={cn('Tabs-nav-item', {
              active: paneKey === (activeKey || activePaneKey),
            })}
            onClick={() => (activeKey ? onChange && onChange(paneKey) : setActivePaneKey(paneKey))}
          >
            {title}
          </button>
        ))}
      </nav>

      <ul className="Tabs-content">
        {panes.map((pane) => {
          const { paneKey, prerender } = pane.props

          const isActive = paneKey === (activeKey || activePaneKey)

          return isActive || renderMapRef.current.get(paneKey) || prerender ? (
            <Fragment key={paneKey}>
              {cloneElement(pane as any, {
                active: isActive,
              })}
            </Fragment>
          ) : null
        })}
      </ul>
    </div>
  )
}

Tabs.TabPane = TabPanel

export default Tabs
