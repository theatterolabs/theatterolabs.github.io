import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './ImageEnhancement.scss'
import { Uploader, Spinner } from 'common'
import { readFile, POLLING_INTERVAL, BACK_ENV, putObjectSlice, getTempUrl, getJob, createJob, CDN_COS } from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back21.jpeg`
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
const COS_PREFIX = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/imageEnhancement'

const demos: Demo[] = [
  {
    url: `${COS_PREFIX}/Demo1-before.jpg`,
    jobId: '1',
    result: `${COS_PREFIX}/Demo1-after.jfif`,
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/Demo2-before.jpg`,
    jobId: '2',
    result: `${COS_PREFIX}/Demo2-after.jfif`,
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/Demo3-before.png`,
    jobId: '3',
    result: `${COS_PREFIX}/Demo3-after.png`,
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/Demo4-before.jpg`,
    jobId: '4',
    result: `${COS_PREFIX}/Demo4-after.jfif`,
    isSample: true,
  },
]

/** Functions */
async function uploadimage(file: File) {
  const cosKey = `${BACK_ENV}/image/enhancement/${file.size}-${file.name}`
  
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      imageEnhancement: {
        restoration: 1,
      },
    },
    `${BACK_ENV}/result/imageEnhancement`,
  )
}

const ImageEnhancement: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const imagePreviewRef = useRef<HTMLImageElement>(null)
  const imageResultRef = useRef<HTMLImageElement>(null)

  const { t } = useTranslation('imageEnhancement')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<string>()

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
        return setResult(demo.result)
      }

      if (tuuidRef.current === currentTuuid) {
        setResult(undefined)
        setImageMSG('')
      }
      const source = CancelTokenStatic.source()
      requestStack.push(source)

      try {
        const data = await getJob(currentTuuid, source.token)
        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          const resultUrl = await getTempUrl(
            `${BACK_ENV}/result/imageEnhancement/${job.outputs[0].smartContentResult?.imageEnhancement}`,
          )

          if (resultUrl) {
            demo.result = resultUrl
            tuuidRef.current === currentTuuid && setResult(demo.result)
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
    <div className="ImageEnhancement">
      <div
        className="ImageEnhancement-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="ImageEnhancement-banner-content">
          <h2 className="ImageEnhancement-banner-title">{t`imageEnhancement`}</h2>
          <p className="ImageEnhancement-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="ImageEnhancement-demo">
        <div className="ImageEnhancement-main">
          <div className="ImageEnhancement-preview">
            <h2 className="ImageEnhancement-main-title">{t`originalPicture`}</h2>
            <div className="ImageEnhancement-preview-wrap">
              <img src={previewURL} ref={imagePreviewRef} alt=""></img>
            </div>
          </div>
          <div className="ImageEnhancement-result">
            <h2 className="ImageEnhancement-main-title">{t`processedPicture`}</h2>
            <div
              className={cn('ImageEnhancement-result-wrap', {
                loading: loadingTuuid || (!result && !imageMSG),
              })}
            >
              {imageMSG && !result ? (
                <div className="ImageEnhancement-result-message">{`${t`tip.imageFailed`} (${imageMSG})`}</div>
              ) : (
                <img src={result} ref={imageResultRef} alt=""></img>
              )}
              <div className="ImageEnhancement-result-cover">
                <Spinner />
                <p className="ImageEnhancement-result-cover-status">
                  {t(`tip.${loadingTuuid ? 'uploadingPicture' : 'processingPicture'}`)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ImageEnhancement-sample">
          <ul className="ImageEnhancement-sample-list">
            {demos.map(({ isSample, url }, index) => (
              <li
                key={url}
                className={cn('ImageEnhancement-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(demos[index])}
              >
                <img src={url} alt=""></img>
                {isSample ? null : (
                  <span className="ImageEnhancement-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('ImageEnhancement-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="image/jpg" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ImageEnhancement
