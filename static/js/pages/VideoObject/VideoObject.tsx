import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './VideoObject.scss'
import { Uploader, Spinner } from 'common'
import { readVideo, POLLING_INTERVAL, BACK_ENV, putObjectSlice, getTempUrl, getJob, createJob, CDN_COS,formatJson } from 'utils'
import { resultJson1,resultJson2,resultJson3,resultJson4 } from './resultJson'

import axios from 'axios'

const bannerURL = `${CDN_COS}/assets/image/back10.jpg`
/** Types */
type Demo = {
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result?: string
  uploading?: boolean
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken
const COS_PREFIX = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/videoObject'

const demos: Demo[] = [
  {
    url: `${COS_PREFIX}/sample1.mp4`,
    jobId: '1',
    result: resultJson1,
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/sample2.mp4`,
    jobId: '2',
    result: resultJson2,
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/sample3.mp4`,
    jobId: '3',
    result: resultJson3,
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/sample4.mp4`,
    jobId: '4',
    result: resultJson4,
    isSample: true,
  },
]

/** Functions */
async function uploadVideo(file: File) {
  const cosKey = `${BACK_ENV}/video/videoObject/${file.size}-${file.name}`
  
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      outputPrefix: `${Math.random().toString(36).slice(-6)}`,
      "videoAnalysis": {
        "type": 2
      }
    },
    `${BACK_ENV}/result/videoObject`,
  )
}

const VideoObject: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const videoPreviewRef = useRef<HTMLVideoElement>(null)
  const videoResultRef = useRef<HTMLVideoElement>(null)

  const { t } = useTranslation('videoObject')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<string>()

  const [videoMSG, setVideoMSG] = useState<string | number>('')

  useEffect(() => {
    const requestStack = requestStackRef.current

    return () => {
      requestStack.forEach((source) => {
        source.cancel('Exit page')
      })
    }
  }, [])

  useEffect(() => {
    /** Stop playing video when currentTuuid changes */
    videoPreviewRef.current?.pause()
    videoResultRef.current?.pause()

    const requestStack = requestStackRef.current

    async function request() {
      const demo = demos.find((demo) => demo.jobId === currentTuuid)
      if (!demo) return
      if (demo.result) {
        return setResult(demo.result)
      }

      if (tuuidRef.current === currentTuuid) {
        setResult(undefined)
        setVideoMSG('')
      }
      const source = CancelTokenStatic.source()
      requestStack.push(source)

      try {
        const data = await getJob(currentTuuid, source.token)
        const job = data.getJobResponse?.job
        console.log(job);
        if (job && job.state === 3) {
          // const resultUrl = await getTempUrl(
          //   `${BACK_ENV}/result/videoObject/${job.outputs[0].smartContentResult?.videoBgmGeneration?.[0].videoName}`,
          // )

          const resultJsonUrl = await getTempUrl(
            `${BACK_ENV}/result/videoObject/${job.outputs[0].smartContentResult?.videoAnalysis?.detectionFileName}`,
          )

          const jsonResponse = await axios.get(resultJsonUrl);

          if (jsonResponse.data) {
            demo.result = jsonResponse.data
            tuuidRef.current === currentTuuid && setResult(demo.result)
          }
        } else {
          if (data.errorResponse) {
            tuuidRef.current === currentTuuid && setVideoMSG(data.errorResponse.message)
          } else if (job) {
            if (job.state === 4) {
              tuuidRef.current === currentTuuid && setVideoMSG('Job Failed')
            } else if ([1, 2].includes(job.state) && tuuidRef.current === currentTuuid) {
              setTimeout(request, POLLING_INTERVAL)
            }
          }
        }
      } catch (e) {
        setTimeout(request, POLLING_INTERVAL)
        console.log(e)
      } finally {
        /** Remove the source when request is finished */
        const sourceIndex = requestStack.indexOf(source)
        sourceIndex > -1 && requestStack.splice(sourceIndex, 1)
      }
    }

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
      const target = await readVideo(file)

      if (target) {
        const arrayBuffer = target.result as string
        let url = URL.createObjectURL(new Blob([arrayBuffer]));

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
            previewURLRef.current === demo.url && setCurrentTuuid(data.createJobResponse.job.id)
            
            

            tuuidRef.current = demo.jobId
          } else {
            setVideoMSG(data.errorResponse?.message || 'Upload Failed')
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
    (demo: Demo) => {
      if (demo && previewURL !== demo.url) {
        switchDemo(demo)
      }
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
    <div className="VideoObject">
      <div
        className="VideoObject-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="VideoObject-banner-content">
          <h2 className="VideoObject-banner-title">{t`videoObject`}</h2>
          <p className="VideoObject-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="VideoObject-demo">
        <div className="VideoObject-main">
          <div className="VideoObject-preview">
            <h2 className="VideoObject-main-title">{t`inputVideo`}</h2>
            <div className="VideoObject-preview-wrap">
              <video src={previewURL} controls controlsList="nodownload" ref={videoPreviewRef}></video>
            </div>
          </div>
          <div className="VideoObject-result">
            <h2 className="VideoObject-main-title">{t`detectionResult2`}</h2>
            <div
              className={cn('VideoObject-result-wrap', {
                loading: loadingTuuid || (!result && !videoMSG),
              })}
            >
              {videoMSG && !result ? (
                <div className="VideoObject-result-message">{`${t`tip.processedFailed`} (${videoMSG})`}</div>
              ) : (<textarea className="VideoObject-result-json" value={formatJson(result)} readOnly></textarea>)}
              <div className="VideoObject-result-cover">
                <Spinner />
                <p className="VideoObject-result-cover-status">
                  {t(`tip.${loadingTuuid ? 'uploadingVideo' : 'processingVideo'}`)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="VideoObject-sample">
          <ul className="VideoObject-sample-list">
            {demos.map(({ isSample, url }, index) => (
              <li
                key={url}
                className={cn('VideoObject-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(demos[index])}
              >
                <video src={url}></video>
                {isSample ? null : (
                  <span className="VideoObject-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('VideoObject-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="video/*" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default VideoObject
