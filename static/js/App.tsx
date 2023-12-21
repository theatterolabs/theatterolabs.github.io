import React, { useEffect, useRef } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useCookies } from 'react-cookie'

import './App.scss'
import { Header, Footer, AuthRoute } from 'common'
import {
  Auth,
  Home,
  //ImageDescription,
  ImageCaption,
  //VideoDescription,
  VideoCaption,
  Lyrics,
  VideoMusic,
  MusicVideo,
  GenreTransform,
  InstrumentTransform,
  SeperateTransform,
  Football,
  MusicBeat,
  MusicHighlight,
  Wzry,
  GVA,
  VideoCrop,
  SmartCover,
  OCR,
  RemoveWatermark,
  SmartVlog,
  AudioTagger,
  ImageEnhancement,
  ImageScene,
  ImageComposition,
  ImageObject,
  VideoComposition,
  VideoScene,
  VideoObject,
  SingingConversion,
  // SpeechConversion,
  VoiceCloning,
  // VoiceCloning2
} from 'pages'

const App: React.FC = () => {
  const { pathname } = useLocation()

  const [cookies, setCookie] = useCookies(['uuid'])

  const uuidRef = useRef(cookies['uuid'])

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!uuidRef.current) {
      const uuid = uuidv4()
      setCookie('uuid', uuid, {
        path: '/',
        sameSite: 'none',
        secure: true,
      })

      uuidRef.current = uuid
    }

    async function request() {
      const data = {
        token: 'gv#ffq09Jvn',
        accessSession: uuidRef.current,
        pageId: pathname,
        host: 'smartContent',
      }

      try {
        await fetch('https://service-fdxdzlbf-1251316161.bj.apigw.tencentcs.com/release/MmediaAccessReport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
      } catch (e) {
        console.log(e)
      }
    }

    if (process.env.NODE_ENV === 'production') {
      request()
    }
  }, [pathname, setCookie])

  return (
    <>
      <Header />

      <div className="Layout">
        <Switch>
          <AuthRoute path="/" exact>
            <Home />
          </AuthRoute>
          {/* <AuthRoute path="/imageDescription" exact>
            <ImageDescription />
          </AuthRoute> */}
          <AuthRoute path="/imageCaption" exact>
            <ImageCaption />
          </AuthRoute>
          {/* <AuthRoute path="/videoDescription" exact>
            <VideoDescription />
          </AuthRoute> */}
          <AuthRoute path="/videoCaption" exact>
            <VideoCaption />
          </AuthRoute>
          <AuthRoute path="/wzry" exact>
            <Wzry />
          </AuthRoute>
          <AuthRoute path="/lyrics" exact>
            <Lyrics />
          </AuthRoute>
          <AuthRoute path="/videoMusic" exact>
            <VideoMusic />
          </AuthRoute>
          <AuthRoute path="/musicVideo" exact>
            <MusicVideo />
          </AuthRoute>
          <AuthRoute path="/football" exact>
            <Football />
          </AuthRoute>
          <AuthRoute path="/genreTransform" exact>
            <GenreTransform />
          </AuthRoute>
          <AuthRoute path="/instrumentTransform" exact>
            <InstrumentTransform />
          </AuthRoute>
          <AuthRoute path="/seperateTransform" exact>
            <SeperateTransform />
          </AuthRoute>
          <AuthRoute path="/musicBeat" exact>
            <MusicBeat />
          </AuthRoute>
          <AuthRoute path="/musicHighlight" exact>
            <MusicHighlight />
          </AuthRoute>
          <AuthRoute path="/audioTagger" exact>
            <AudioTagger />
          </AuthRoute>
          <AuthRoute path="/gva" exact>
            <GVA />
          </AuthRoute>
          <AuthRoute path="/videoCrop" exact>
            <VideoCrop />
          </AuthRoute>
          <AuthRoute path="/smartCover" exact>
            <SmartCover />
          </AuthRoute>
          <AuthRoute path="/ocr" exact>
            <OCR />
          </AuthRoute>
          <AuthRoute path="/removeWatermark" exact>
            <RemoveWatermark />
          </AuthRoute>
          <AuthRoute path="/smartVlog" exact>
            <SmartVlog />
          </AuthRoute>
          <AuthRoute path="/imageEnhancement" exact>
            <ImageEnhancement />
          </AuthRoute>

          <AuthRoute path="/imageComposition" exact>
            <ImageComposition />
          </AuthRoute>

          <AuthRoute path="/imageScene" exact>
            <ImageScene />
          </AuthRoute>

          <AuthRoute path="/imageObject" exact>
            <ImageObject />
          </AuthRoute>

          <AuthRoute path="/videoComposition" exact>
            <VideoComposition />
          </AuthRoute>
          <AuthRoute path="/singingConversion" exact>
            <SingingConversion />
          </AuthRoute>
          <AuthRoute path="/voiceCloning" exact>
            <VoiceCloning />
          </AuthRoute>
          {/* <AuthRoute path="/voiceCloning2" exact>
            <VoiceCloning2 />
          </AuthRoute> */}
          
          <AuthRoute path="/videoScene" exact>
            <VideoScene />
          </AuthRoute>
          
          <AuthRoute path="/videoObject" exact>
            <VideoObject />
          </AuthRoute>
          
          
          <Route path="/auth" exact>
            <Auth />
          </Route>
          
        </Switch>

        <Footer />
      </div>
    </>
  )
}

export default App
