import React from 'react'
import { CDN_COS } from 'utils'

import './Home.scss'

const bannerURL = `${CDN_COS}/assets/image/home_banner.jpg`

const Home: React.FC = () => {
  return (
    <div className="Home">
      <div
        className="Home-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      ></div>
    </div>
  )
}

export default Home
