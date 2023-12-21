import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './RemoveWatermark.scss'
import { Uploader, Spinner, RemoveWatermarkResult } from 'common'
import { readFile, POLLING_INTERVAL, BACK_ENV, putObjectSlice, getTempUrl, getJob, createJob, CDN_COS, RemoveWatermarkResponse } from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back19.jpg`
/** Types */
type Demo = {
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result?: RemoveWatermarkResponse
  uploading?: boolean
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken
const COS_PREFIX = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/removeWatermark'

const demos: Demo[] = [
  {
    url: `${COS_PREFIX}/DouYin.mp4`,
    jobId: '1',
    result: {
      watermarkInfos: [
        {
          xCoordinate: "605", yCoordinate: "1838", width: "432", height: "50", content: "我的抖音号：1314988"
        },
        {
          xCoordinate: "904", yCoordinate: "1748", width: "142", height: "88", content: "抖音"
        },
        {
          xCoordinate: "33", yCoordinate: "134", width: "435", height: "42", content: "我的抖音号：1314988"
        },
        {
          xCoordinate: "119", yCoordinate: "40", width: "144", height: "82", content: "抖音"
        }],
      fileName: "934a71537c964d899dee515e2ba7598c_1623900672365.mp4"
    },
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/Tencent.mp4`,
    jobId: '2',
    result: {
      watermarkInfos: [
        {
          xCoordinate: "1112", yCoordinate: "40", width: "116", height: "33", content: "腾讯视频"
        }],
      fileName: "93cbc9e19dc445c79e39ebda492f8ad9_1623942106515.mp4"
    },
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/KuaiShou.mp4`,
    jobId: '3',
    result: {
      watermarkInfos: [
        {
          xCoordinate: "253", yCoordinate: "1234", width: "212", height: "34", content: "快手@939855539"
        },
        {
          xCoordinate: "279", yCoordinate: "1141", width: "165", height: "72", content: "留快手"
        }],
      fileName: "8e5ff0cc0122415193543c949b0e28f9_1623942657957.mp4"
    },
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/XiGua.MP4`,
    jobId: '4',
    result: {
      watermarkInfos: [
        {
          xCoordinate: "540", yCoordinate: "22", width: "80", height: "25", content: "西瓜视频"
        },],
      fileName: "5619187a169d45088c16ce1b4fdab60c_1624344568856.mp4"
    },
    isSample: true,
  },
]

/** Functions */
async function uploadVideo(file: File) {
  const cosKey = `${BACK_ENV}/video/removeWatermark/${file.size}-${file.name}`
  
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      removeWatermark: {
        outputFile: 2,
      },
    },
    `${BACK_ENV}/result/removeWatermark`,
  )
}

const RemoveWatermark: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const videoPreviewRef = useRef<HTMLVideoElement>(null)
  const videoResultRef = useRef<HTMLVideoElement>(null)

  const { t } = useTranslation('removeWatermark')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<RemoveWatermarkResponse>()

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

        if (job && job.state === 3) {
          const resultUrl = job.outputs[0].smartContentResult?.removeWatermark

          if (resultUrl) {
            demo.result = resultUrl
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
    <div className="RemoveWatermark">
      <div
        className="RemoveWatermark-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="RemoveWatermark-banner-content">
          <h2 className="RemoveWatermark-banner-title">
            {t`removeWatermark`}
            <span className="RemoveWatermark-banner-title-tag">Beta</span>
          </h2>
          <p className="RemoveWatermark-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="RemoveWatermark-demo">
        <div className="RemoveWatermark-main">
          <div className="RemoveWatermark-preview">
            <h2 className="RemoveWatermark-main-title">
              {t`originalVideo`}
            </h2>
            <div className="RemoveWatermark-preview-wrap">
              <video src={previewURL} controls controlsList="nodownload" ref={videoPreviewRef}> </video>
            </div>
          </div>
          <div className="RemoveWatermark-result">
            <h2 className="RemoveWatermark-result-title">{t`removedWatermarks`}</h2>
            <div className="RemoveWatermark-result-wrap">
              <RemoveWatermarkResult result={result ? result || 'Error' : undefined} />
            </div>
              <div
              className={cn('RemoveWatermark-result-placeholder', {
                loading: loadingTuuid || (!result && !videoMSG),
              })}
            >
              <Spinner />
              <p className="RemoveWatermark-result-placeholder-status">{t(`tip.${loadingTuuid ? 'uploadingVideo' : 'processingVideo'}`)}</p>
            </div>
          </div>
        </div>


        <div className="RemoveWatermark-sample">
          <ul className="RemoveWatermark-sample-list">
            {demos.map(({ isSample, url }, index) => (
              <li
                key={url}
                className={cn('RemoveWatermark-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(demos[index])}
              >
                <video src={url}></video>
                {isSample ? null : (
                  <span className="RemoveWatermark-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('RemoveWatermark-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} message={t`tip.videoTimeLimit`} accept="video/*" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RemoveWatermark
