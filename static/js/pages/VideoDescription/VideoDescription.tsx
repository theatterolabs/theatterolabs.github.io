import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './VideoDescription.scss'
import { Uploader, Tabs, Spinner, KeywordsResult, ArticlesResult } from 'common'
import {
  getJob,
  createJob,
  readFile,
  POLLING_INTERVAL,
  putObjectSlice,
  getTempUrl,
  BACK_ENV,
  VideoDescriptionResults,
  VideoResultObject,
  CDN_COS,
} from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back10.jpg`
/** Types */
type Demo = {
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  poster?: string
  result?: VideoResultObject
  uploading?: boolean
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const TabPane = Tabs.TabPane

const demos: Demo[] = [
  {
    url: `${CDN_COS}/assets/videoDescription/sample1.mp4`,
    jobId: '1',
    isSample: true,
    result: VideoDescriptionResults[0],
  },
  {
    url: `${CDN_COS}/assets/videoDescription/sample2.mp4`,
    jobId: '2',
    isSample: true,
    result: VideoDescriptionResults[1],
  },
  {
    url: `${CDN_COS}/assets/videoDescription/sample3.mp4`,
    jobId: '3',
    isSample: true,
    result: VideoDescriptionResults[2],
  },
  {
    url: `${CDN_COS}/assets/videoDescription/sample4.mp4`,
    jobId: '4',
    isSample: true,
    result: VideoDescriptionResults[3],
  },
]

/** Functions */
async function uploadVideo(file: File) {
  const cosKey = `${BACK_ENV}/video/description/${file.size}-${file.name}`
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      apparelVideoDescription: 2,
    },
  )
}

const VideoDescription: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('videoDescription')

  const [mode, setMode] = useState<React.ReactText>('keywords')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<VideoResultObject>()

  useEffect(() => {
    const requestStack = requestStackRef.current

    return () => {
      requestStack.forEach((source) => {
        source.cancel('Exit page')
      })
    }
  }, [])

  useEffect(() => {
    const requestStack = requestStackRef.current

    async function request() {
      const demo = demos.find((demo) => demo.jobId === currentTuuid)
      if (!demo) return

      if (demo.result) {
        return setResult(demo.result)
      }
      tuuidRef.current === currentTuuid && setResult(undefined)

      const source = CancelTokenStatic.source()
      requestStack.push(source)

      try {
        const data = await getJob(currentTuuid, source.token)
        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          /** Task complete */
          demo.result = job.outputs[0].smartContentResult?.apparelVideoDescription

          tuuidRef.current === currentTuuid && setResult(demo.result)
        } else if (job) {
          if (job.state === 4) {
            tuuidRef.current === currentTuuid && alert('Job Failed')
          } else if ([1, 2].includes(job.state) && tuuidRef.current === currentTuuid) {
            setTimeout(request, POLLING_INTERVAL)
          }
        }
      } catch (e) {
        setTimeout(request, POLLING_INTERVAL)
        console.log(e)
      } finally {
        const sourceIndex = requestStack.indexOf(source)
        sourceIndex > -1 && requestStack.splice(sourceIndex, 1)
      }
    }

    setMode('keywords')

    /* No need make request when current tuuid is empty (eg: when swtiching from a uploaded sample to a uploading sample)  */
    currentTuuid && request()
  }, [currentTuuid])

  const switchDemo = useCallback((demo: Demo) => {
    setCurrentTuuid(demo.jobId)
    tuuidRef.current = demo.jobId

    setPreviewURL(demo.url)
    previewURLRef.current = demo.url

    setLoadingTuuid(!!demo.uploading)
  }, [])

  const onUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || !files.length) return

      const file = files[0]
      const target = await readFile(file)

      if (target) {
        const url = target.result as string

        const duplicateDemo = demos.find((demo) => demo.url === url)
        if (duplicateDemo) {
          switchDemo(duplicateDemo)

          return
        }

        const demo: Demo = { url, jobId: '' }
        demos.push(demo)

        setPreviewURL(demo.url)
        previewURLRef.current = demo.url

        setCurrentTuuid('')
        setResult(undefined)

        /** Upload video */
        setLoadingTuuid(true)
        demo.uploading = true

        try {
          const data = await uploadVideo(file)
          if (data.createJobResponse?.job?.id) {
            demo.jobId = data.createJobResponse.job.id
            previewURLRef.current === demo.url && setCurrentTuuid(demo.jobId)

            tuuidRef.current = demo.jobId
          }

          setLoadingTuuid(false)
          demo.uploading = false
        } catch (e) {
          console.log(e)
        }
      }
    },
    [switchDemo],
  )

  const onChangeSample = useCallback(
    (index: number) => {
      const demo = demos[index]

      if (previewURL === demo.url) return

      switchDemo(demo)
    },

    [previewURL, switchDemo],
  )

  const onDelete = useCallback(
    (index: number, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation()

      const demo = demos[index]

      if (demo.uploading && demo.source) {
        demo.source.cancel('Cancel Upload')
      }

      if (previewURL === demo.url) switchDemo(demos[index - 1])

      demos.splice(index, 1)
      setDemosLength(demosLength - 1)
    },
    [previewURL, switchDemo, demosLength],
  )

  return (
    <div className="VideoDescription">
      <div
        className="VideoDescription-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="VideoDescription-banner-content">
          <h2 className="VideoDescription-banner-title">{t`videoDescription`}</h2>
          <p className="VideoDescription-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="VideoDescription-demo">
        <p>{`* ${t`supportsTip`}`}</p>

        <div className="VideoDescription-main">
          <div className="VideoDescription-preview">
            <video src={previewURL} controls autoPlay loop muted controlsList="nodownload"></video>
          </div>
          <div className="VideoDescription-result">
            <div className="tab-wrapper">
              <Tabs activeKey={mode} onChange={setMode}>
                <TabPane title={t`keywords`} paneKey="keywords">
                  <div className="tab-pane">
                    <KeywordsResult keywords={result?.keywords} />
                  </div>
                </TabPane>
                <TabPane title={t`articles`} paneKey="article">
                  <div className="tab-pane">
                    <ArticlesResult article={result?.article} />
                  </div>
                </TabPane>
              </Tabs>
            </div>
            <div
              className={cn('VideoDescription-result-placeholder', {
                loading: loadingTuuid,
              })}
            >
              <Spinner />
              <p className="VideoDescription-result-placeholder-status">{t`tip.uploadingVideo`}</p>
            </div>
          </div>
        </div>

        <div className="VideoDescription-sample">
          <ul className="VideoDescription-sample-list">
            {demos.map(({ isSample, url, poster }, index) => (
              <li
                key={url}
                className={cn('VideoDescription-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(index)}
              >
                <video poster={poster} src={url}></video>
                {isSample ? null : (
                  <span className="VideoDescription-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('VideoDescription-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="video/mp4" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default VideoDescription
