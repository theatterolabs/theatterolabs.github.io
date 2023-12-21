import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './OCR.scss'
import { Uploader, Spinner, OCRResult } from 'common'
import { getJob, createJob, readFile, POLLING_INTERVAL, putObject, getTempUrl, BACK_ENV, CDN_COS } from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back18.jpeg`
/** Types */
type Demo = {
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result?: string[] | undefined
  uploading?: boolean
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const demos: Demo[] = [
  {
    url: `${CDN_COS}/assets/ocr/sample1.jpg`,
    jobId: '1',
    isSample: true,
    result: ['那民不聊生的惨状',]
  },
  {
    url: `${CDN_COS}/assets/ocr/sample2.jpeg`,
    jobId: '2',
    isSample: true,
    result: [
      '2004年初审通过',
      '经全国中小学教材审定委员会',
      '义务教育',
      '数',
      '九年级',
      '中学数学课程教材研究开发中心',
      '课程教材研究所',
      'SHUXUE',
      '下册',
      '民木市大质社',
      '编著',
      '旅',
      '课程标准实验教科书']
  },
  {
    url: `${CDN_COS}/assets/ocr/sample3.jpeg`,
    jobId: '3',
    isSample: true,
    result: ['世界这么大，', '能遇见，不容易'],
  },
  {
    url: `${CDN_COS}/assets/ocr/sample4.png`,
    jobId: '4',
    isSample: true,
    result: ['晚安', '喜欢你', '要跟喜欢的人说晚安', '我也喜欢你'],
  },
  
]

/** Functions */
async function uploadImage(file: File) {
  const cosKey = `${BACK_ENV}/image/ocr/${file.size}-${file.name}`
  await putObject(file, cosKey)
  const url = await getTempUrl(cosKey)
  
  return await createJob(
    { url },
    { ocr: 2 },
    `${BACK_ENV}/result/ocr`,
  )
}

const OCR: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('ocr')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<string[] | undefined>()

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
        const results: string[] = []
        
        if (job && job.state === 3 && typeof (job.outputs[0].smartContentResult?.ocr) !== "undefined") {
          for (let i = 0; i < job.outputs[0].smartContentResult?.ocr?.length; i++) {
            results.push(job.outputs[0].smartContentResult?.ocr?.[i].text)
          }

          if (results) {
            demo.result = results
            tuuidRef.current === currentTuuid && setResult(demo.result)
          }
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


    /* No need make request when current tuuid is empty (eg: when swtiching from a uploaded sample to a uploading sample)  */
    currentTuuid && request()
  }, [currentTuuid, result])

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

        setLoadingTuuid(true)
        demo.uploading = true

        try {
          const data = await uploadImage(file)
          if (data.createJobResponse?.job?.id) {
            demo.jobId = data.createJobResponse.job.id
            previewURLRef.current === demo.url && setCurrentTuuid(data.createJobResponse.job.id)
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
    <div className="OCR">
      <div
        className="OCR-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="OCR-banner-content">
          <h2 className="OCR-banner-title">
            {t`ocr`}
            <span className="OCR-banner-title-tag">Beta</span>
          </h2>
          <p className="OCR-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="OCR-demo">
        <div className="OCR-main">
          <div className="OCR-preview">
          <h2 className="OCR-main-title">{t`originalPicture`}</h2>
            <div className="OCR-preview-wrap">
              <img src={previewURL} alt='Original Picture'/>
            </div>
          </div>
          <div className="OCR-result">
          <h2 className="OCR-result-title">{t`OCRResult`}</h2>
            <div className="OCR-result-wrap">
              <OCRResult result={result ? result || 'Error' : undefined} />
            </div>
            <div
              className={cn('OCR-result-placeholder', {
                loading: loadingTuuid,
              })}
            >
              <Spinner/>
              <p className="OCR-result-placeholder-status">{t`tip.uploadingPicture`}</p>
            </div>
          </div>
        </div>

        <div className="OCR-sample">
          <ul className="OCR-sample-list">
            {demos.map(({ isSample, url }, index) => (
              <li
                key={url}
                className={cn('OCR-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(index)}
              >
                <img src={url} alt='OCR samples'/>
                {isSample ? null : (
                  <span className="OCR-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('OCR-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="image/jpg" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OCR