import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import { Uploader, Spinner, Tabs } from 'common'
import { readFile, POLLING_INTERVAL, BACK_ENV, putObjectSlice, getTempUrl, getJob, createJob, CDN_COS } from 'utils'
import './SmartCover.scss'

const bannerURL = `${CDN_COS}/assets/image/back17.jpg`
type Demo = {
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result?: string[]
  uploading?: boolean
}

const CancelTokenStatic = axiosStatic.CancelToken
const COS_PREFIX = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/smartCover'
const TabPane = Tabs.TabPane

const demos: Demo[] = [
  {
    url: `${COS_PREFIX}/sample1.mp4`,
    jobId: '1',
    result: [`${COS_PREFIX}/result1_1.jpg`, `${COS_PREFIX}/result1_2.jpg`, `${COS_PREFIX}/result1_3.jpg`,],
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/sample2.mp4`,
    jobId: '2',
    result: [`${COS_PREFIX}/result2_1.jpg`, `${COS_PREFIX}/result2_2.jpg`, `${COS_PREFIX}/result2_3.jpg`,],
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/sample3.mp4`,
    jobId: '3',
    result: [`${COS_PREFIX}/result3_1.jpg`, `${COS_PREFIX}/result3_2.jpg`, `${COS_PREFIX}/result3_3.jpg`,],
    isSample: true,
  },
]


async function uploadVideo(file: File) {
  const cosKey = `${BACK_ENV}/video/smartCover/${file.size}-${file.name}`
  
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      outputPrefix: `${Math.random().toString(36).slice(-6)}`,
      smartCover: {
        outputType: 1
      }
    },
    `${BACK_ENV}/result/smartCover`,
  )
}

// async function getVideoTime(file: File) {
//   return new Promise((resolve,reject) => {
//     let url = URL.createObjectURL(file);
//     let audioElement = new Audio(url);
//     audioElement.addEventListener("loadedmetadata", (_event)=> {
//       let duration = audioElement.duration;
//       if (duration <= 120) {
//         resolve('Within Time Limit')
//       } else {
//         reject('Exceed Time Limit')
//       }
//     });
//   })
// }

const SmartCover: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const videoPreviewRef = useRef<HTMLVideoElement>(null)
  const videoResultRef = useRef<HTMLImageElement>(null)

  const { t } = useTranslation('smartCover')
  const [cover, setCover] = useState<React.ReactText>('cover1')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<string[]>()

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

        let resultUrl: string[] = []

        if (job && job.state === 3) {
          resultUrl.push(await getTempUrl(
            `${BACK_ENV}/result/smartCover/${job.outputs[0].smartContentResult?.smartCover?.[0].fileName}`) 
          )
          resultUrl.push(await getTempUrl(
            `${BACK_ENV}/result/smartCover/${job.outputs[0].smartContentResult?.smartCover?.[1].fileName}`) 
          )
          resultUrl.push(await getTempUrl(
            `${BACK_ENV}/result/smartCover/${job.outputs[0].smartContentResult?.smartCover?.[2].fileName}`) 
          )
          
          if (resultUrl.length === 3) {
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

    setCover('cover1')
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

      // setVideoMSG('')
      // let promise = getVideoTime(file)
      // promise.catch((error) => {
      //   setVideoMSG(error)
      // })
      
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
    <div className="SmartCover">
      <div
        className="SmartCover-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="SmartCover-banner-content">
          <h2 className="SmartCover-banner-title">{t`smartCover`}</h2>
          <p className="SmartCover-banner-description">{t`intro`}</p>
        </div>
      </div>
      <div className="SmartCover-demo">
        <div className="SmartCover-main">
          <div className="SmartCover-preview">
            <h2 className="SmartCover-main-title">{t`originalVideo`}</h2>
            <div className="SmartCover-preview-wrap">
              <video src={previewURL} controls controlsList="nodownload" ref={videoPreviewRef}></video>
            </div>
          </div>
          <div className="SmartCover-result">
            <h2 className="SmartCover-main-title">{t`coverResults`}</h2>
            <div
              className={cn('SmartCover-result-wrap', {
                loading: loadingTuuid || (!result && !videoMSG),
              })}
            >
              <Tabs activeKey={cover} onChange={setCover}>
                <TabPane title={t`cover.cover1`} paneKey="cover1">
                  <div className="tab-pane">
                    {(videoMSG && !result) ? (
                    <div className="SmartCover-result-message">{`${t`tip.processedFailed`} (${videoMSG})`}</div>
                    ) : (typeof (result) == 'undefined' ?
                      (<div className="SmartCover-result-cover">
                      <Spinner />
                      <p className="SmartCover-result-cover-status">
                        {t(`tip.${loadingTuuid ? 'uploadingVideo' : 'processingVideo'}`)}
                      </p>
                    </div>):
                      (<img src={result[0]} ref={videoResultRef} alt="Result Covers"/>)
                    )}
                  </div>
                </TabPane>
                <TabPane title={t`cover.cover2`} paneKey="cover2">
                <div className="tab-pane">
                    {(videoMSG && !result) ? (
                    <div className="SmartCover-result-message">{`${t`tip.processedFailed`} (${videoMSG})`}</div>
                    ) : (typeof (result) == 'undefined' ?
                      (<div className="SmartCover-result-cover">
                      <Spinner />
                      <p className="SmartCover-result-cover-status">
                        {t(`tip.${loadingTuuid ? 'uploadingVideo' : 'processingVideo'}`)}
                      </p>
                    </div>):
                      (<img src={result[1]} ref={videoResultRef} alt="Result Covers"/>)
                    )}
                  </div>
                </TabPane>
                <TabPane title={t`cover.cover3`} paneKey="cover3">
                <div className="tab-pane">
                    {(videoMSG && !result) ? (
                    <div className="SmartCover-result-message">{`${t`tip.processedFailed`} (${videoMSG})`}</div>
                    ) : (typeof (result) == 'undefined' ?
                      (<div className="SmartCover-result-cover">
                      <Spinner />
                      <p className="SmartCover-result-cover-status">
                        {t(`tip.${loadingTuuid ? 'uploadingVideo' : 'processingVideo'}`)}
                      </p>
                    </div>):
                      (<img src={result[2]} ref={videoResultRef} alt="Result Covers"/>)
                    )}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="SmartCover-sample">
          <ul className="SmartCover-sample-list">
            {demos.map(({ isSample, url }, index) => (
              <li
                key={url}
                className={cn('SmartCover-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(demos[index])}
              >
                <video src={url}></video>
                {isSample ? null : (
                  <span className="SmartCover-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('SmartCover-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} message={t`tip.videoTimeLimit`} accept="video/*" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SmartCover
