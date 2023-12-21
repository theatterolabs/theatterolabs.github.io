import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import './ImageObject.scss'
import { Uploader, Spinner } from 'common'
import { readFile, POLLING_INTERVAL, BACK_ENV, putObjectSlice, getTempUrl, getJob, createJob, CDN_COS, formatJson } from 'utils'
import { resultJson1,resultJson2,resultJson3,resultJson4 } from './resultJson'

const bannerURL = `${CDN_COS}/assets/image/back21.jpeg`
/** Types */
type Demo = {
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result?: string
  uploading?: boolean
  resultJson?: string
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken
const COS_PREFIX = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/imageDetection'

const demos: Demo[] = [
  {
    url: `${COS_PREFIX}/demo1.jpg`,
    jobId: '1',
    result: `${COS_PREFIX}/result1.jpg`,
    isSample: true,
    resultJson:resultJson1
  },
  {
    url: `${COS_PREFIX}/demo2.jpg`,
    jobId: '2',
    result: `${COS_PREFIX}/result2.jpg`,
    isSample: true,
    resultJson:resultJson2
  },
  {
    url: `${COS_PREFIX}/demo3.jpg`,
    jobId: '3',
    result: `${COS_PREFIX}/result3.jpg`,
    isSample: true,
    resultJson:resultJson3
  },
  {
    url: `${COS_PREFIX}/demo4.jpg`,
    jobId: '4',
    result: `${COS_PREFIX}/result4.jpg`,
    isSample: true,
    resultJson:resultJson4
  },
]

/** Functions */
async function uploadimage(file: File) {
  const cosKey = `${BACK_ENV}/image/object/${file.size}-${file.name}`
  
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      imageAnalysis: {
        type: 4,
      },
    },
    `${BACK_ENV}/result/imageObject`,
  )
}

const ImageObject: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const imagePreviewRef = useRef<HTMLImageElement>(null)
  const imageResultRef = useRef<HTMLImageElement>(null)

  const { t } = useTranslation('imageObject')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<string>()
  const [resultJson, setResultJson] = useState<string>()

  const [imageMSG, setImageMSG] = useState<string | number>('')

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
        setResultJson(demo.resultJson)
        setResult(demo.result)
        return 
      }

      if (tuuidRef.current === currentTuuid) {
        setResultJson(undefined)
        setResult(undefined)
        setImageMSG('')
      }
      const source = CancelTokenStatic.source()
      requestStack.push(source)

      try {
        const data = await getJob(currentTuuid, source.token)
        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          console.log(job)
          const resultUrl = await getTempUrl(
            `${BACK_ENV}/result/imageObject/${job.outputs[0].smartContentResult?.imageAnalysis?.visualizationFileName}`,
          )

          const resultJsonUrl = await getTempUrl(
            `${BACK_ENV}/result/imageObject/${job.outputs[0].smartContentResult?.imageAnalysis?.detectionFileName}`,
          )

          const jsonResponse = await axios.get(resultJsonUrl);

          if (resultUrl && jsonResponse.data) {
            demo.result = resultUrl
            demo.resultJson = jsonResponse.data
            if(tuuidRef.current === currentTuuid){
              setResult(demo.result)
              setResultJson(demo.resultJson)
            } 
          }
        } else {
          if (data.errorResponse) {
            tuuidRef.current === currentTuuid && setImageMSG(data.errorResponse.message)
          } else if (job) {
            if (job.state === 4) {
              tuuidRef.current === currentTuuid && setImageMSG('Job Failed')
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
        setResultJson(undefined)

        /** Upload image */
        setLoadingTuuid(true)
        demo.uploading = true
        try {
          const data = await uploadimage(file)
          if (data.createJobResponse?.job?.id) {
            demo.jobId = data.createJobResponse.job.id
            previewURLRef.current === demo.url && setCurrentTuuid(data.createJobResponse.job.id)
            
            tuuidRef.current = demo.jobId
          } else {
            setImageMSG(data.errorResponse?.message || 'Upload Failed')
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
    <div className="ImageObject">
      <div
        className="ImageObject-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="ImageObject-banner-content">
          <h2 className="ImageObject-banner-title">{t`imageObject`}</h2>
          <p className="ImageObject-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="ImageObject-demo">
        <div className="ImageObject-main">
          <div className="ImageObject-preview">
            <h2 className="ImageObject-main-title">{t`inputImage`}</h2>
            <div className="ImageObject-preview-wrap">
              <img src={previewURL} ref={imagePreviewRef} alt=""></img>
            </div>
          </div>
          <div className="ImageObject-result">
            <h2 className="ImageObject-main-title">{t`detectionResult1`}</h2>
            <div
              className={cn('ImageObject-result-wrap', {
                loading: loadingTuuid || (!result && !imageMSG),
              })}
            >
              {imageMSG && !result ? (
                <div className="ImageObject-result-message">{`${t`tip.imageFailed`} (${imageMSG})`}</div>
              ) : (
                <img src={result} ref={imageResultRef} alt=""></img>
              )}
              <div className="ImageObject-result-cover">
                <Spinner />
                <p className="ImageObject-result-cover-status">
                  {t(`tip.${loadingTuuid ? 'uploadingPicture' : 'processingPicture'}`)}
                </p>
              </div>
            </div>
          </div>
          <div className="ImageObject-result">
            <h2 className="ImageObject-main-title">{t`detectionResult2`}</h2>
            <div
              className={cn('ImageObject-result-wrap', {
                loading: loadingTuuid || (!resultJson && !imageMSG),
              })}
            >
              {imageMSG && !resultJson ? (
                <div className="ImageObject-result-message">{`${t`tip.imageFailed`} (${imageMSG})`}</div>
              ) : (
                resultJson && resultJson.length>0 ? (<textarea className="ImageObject-result-json" value={formatJson(resultJson)} readOnly></textarea>) : 
                (<div className="ImageObject-result-message">{`${t`tip.emptyResult`}`}</div>)
              )}
              <div className="ImageObject-result-cover">
                <Spinner />
                <p className="ImageObject-result-cover-status">
                  {t(`tip.${loadingTuuid ? 'uploadingPicture' : 'processingPicture'}`)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ImageObject-sample">
          <ul className="ImageObject-sample-list">
            {demos.map(({ isSample, url }, index) => (
              <li
                key={url}
                className={cn('ImageObject-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(demos[index])}
              >
                <img src={url} alt=""></img>
                {isSample ? null : (
                  <span className="ImageObject-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('ImageObject-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="image/jpg" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ImageObject
