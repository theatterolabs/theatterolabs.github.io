import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './Wzry.scss'
import { Uploader, Spinner, WzryResult } from 'common'
import {
  WzryHighlight,
  getJob,
  createJob,
  readFile,
  POLLING_INTERVAL,
  putObjectSlice,
  getTempUrl,
  BACK_ENV,
  WzryResults,
  CDN_COS,
} from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back12.jpg`
/** Types */
type Demo = {
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  poster?: string
  result?: WzryHighlight[]
  uploading?: boolean
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const demos: Demo[] = [
  {
    url: `${CDN_COS}/assets/wzry/sample1.mp4`,
    jobId: '1',
    isSample: true,
    result: WzryResults[0],
  },
  {
    url: `${CDN_COS}/assets/wzry/sample2.mp4`,
    jobId: '2',
    isSample: true,
    result: WzryResults[1],
  },
  {
    url: `${CDN_COS}/assets/wzry/sample3.mp4`,
    jobId: '3',
    isSample: true,
    result: WzryResults[2],
  },
  {
    url: `${CDN_COS}/assets/wzry/sample4.mp4`,
    jobId: '4',
    isSample: true,
    result: WzryResults[3],
  },
]

/** Functions */
async function uploadVideo(file: File) {
  const cosKey = `${BACK_ENV}/video/wzry/${file.size}-${file.name}`
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      gameCaption: {
        intervals: undefined,
      },
    },
  )
}

const Wzry: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('wzry')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<WzryHighlight[]>()

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
          demo.result = job.outputs[0].smartContentResult?.gameCaption || []

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
    <div className="Wzry">
      <div
        className="Wzry-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="Wzry-banner-content">
          <h2 className="Wzry-banner-title">{t`wzry`}</h2>
          <p className="Wzry-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="Wzry-demo">
        <p>{`* ${t`supportsTip`}`}</p>

        <div className="Wzry-main">
          <div className="Wzry-preview">
            <video src={previewURL} controls autoPlay loop muted controlsList="nodownload"></video>
          </div>
          <div className="Wzry-result">
            <div className="tab-wrapper">
              <div className="tab-pane">
                <WzryResult results={result} />
              </div>
            </div>
            <div
              className={cn('Wzry-result-placeholder', {
                loading: loadingTuuid,
              })}
            >
              <Spinner />
              <p className="Wzry-result-placeholder-status">{t`tip.uploadingVideo`}</p>
            </div>
          </div>
        </div>

        <div className="Wzry-sample">
          <ul className="Wzry-sample-list">
            {demos.map(({ isSample, url, poster }, index) => (
              <li
                key={url}
                className={cn('Wzry-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(index)}
              >
                <video poster={poster} src={url}></video>
                {isSample ? null : (
                  <span className="Wzry-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('Wzry-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="video/mp4" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Wzry
