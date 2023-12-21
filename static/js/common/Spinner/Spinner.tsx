import React from 'react'

import './Spinner.scss'

interface SpinnerProps {
  size?: string | number
  strokeWidth?: number
}

const Spinner: React.FC<SpinnerProps> = ({ size, strokeWidth = 2 }) => (
  <div className="Spinner">
    <svg className="Spinner-icon" style={{ width: size, height: size }} viewBox="0 0 50 50">
      <circle className="Spinner-path" cx="25" cy="25" r="20" fill="none" strokeWidth={strokeWidth}></circle>
    </svg>
  </div>
)

export default Spinner
