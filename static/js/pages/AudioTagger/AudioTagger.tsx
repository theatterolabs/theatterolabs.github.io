import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './AudioTagger.scss'
import { Uploader, Spinner, AudioTaggerResult } from 'common'
import { getJob, createJob, readFile, POLLING_INTERVAL, putObject, getTempUrl, BACK_ENV, CDN_COS, AudioTaggerResponse, AudioTaggerResults } from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back22.jpg`
/** Types */
type Demo = {
  id: number
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result?: AudioTaggerResponse | undefined
  uploading?: boolean
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken
const COS_PREFIX = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/audioTagger'
const demos: Demo[] = [
  {
    id: 0,
    url: `${COS_PREFIX}/sample1.mp3`,
    jobId: '1',
    isSample: true,
    result: [...AudioTaggerResults[0]]
  },
  {
    id: 1,
    url: `${COS_PREFIX}/sample2.mp3`,
    jobId: '2',
    isSample: true,
    result: [...AudioTaggerResults[1]]
  },
  {
    id: 2,
    url: `${COS_PREFIX}/sample3.mp3`,
    jobId: '3',
    isSample: true,
    result: [...AudioTaggerResults[2]]
  },
  {
    id: 3,
    url: `${COS_PREFIX}/sample4.mp3`,
    jobId: '4',
    isSample: true,
    result: [...AudioTaggerResults[3]]
  },
]

/** Functions */
async function uploadAudio(file: File) {
  const cosKey = `${BACK_ENV}/music/audioTagger/${file.size}-${file.name}`
  await putObject(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      audioTagger:
      {
        tags: [1, 2, 3]
      }
     },
    `${BACK_ENV}/result/audioTagger`,
  )
}

const AudioTagger: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('audioTagger')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<AudioTaggerResponse>()

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
        
        if (job && job.state === 3 && typeof (job.outputs[0].smartContentResult?.audioTagger) !== "undefined") {
          const resulturl = job.outputs[0].smartContentResult.audioTagger

          if (resulturl) {
            demo.result = resulturl
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

        const demo: Demo = {
          id: demos[demos.length - 1].id + 1,
          url,
          jobId: ''
        }
        demos.push(demo)

        setPreviewURL(demo.url)
        previewURLRef.current = demo.url

        setCurrentTuuid('')
        setResult(undefined)

        setLoadingTuuid(true)
        demo.uploading = true

        try {
          const data = await uploadAudio(file)
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
    <div className="AudioTagger">
      <div
        className="AudioTagger-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="AudioTagger-banner-content">
          <h2 className="AudioTagger-banner-title">
            {t`audioTagger`}
            <span className="AudioTagger-banner-title-tag">Beta</span>
          </h2>
          <p className="AudioTagger-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="AudioTagger-demo">
        <div className="AudioTagger-main">
          <div className="AudioTagger-preview">
            <h2 className="AudioTagger-main-title">{t`originalAudio`}</h2>
            <audio src={previewURL} controls controlsList="nodownload"></audio>
          </div>
          <div className="AudioTagger-result">
          <h2 className="AudioTagger-result-title">{t`audioTaggerResult`}</h2>
            <div className="AudioTagger-result-wrap">
              <AudioTaggerResult result={result ? result || 'Error' : undefined} />
            </div>
            <div
              className={cn('AudioTagger-result-placeholder', {
                loading: loadingTuuid,
              })}
            >
              <Spinner />
              <p className="AudioTagger-result-placeholder-status">{t`tip.uploadingAudio`}</p>
            </div>
          </div>
        </div>

        <div className="AudioTagger-sample">
          <ul className="AudioTagger-sample-list">
            {demos.map((demo, index) => (
              <li
                key={demo.url}
                className={cn('AudioTagger-sample-item', { active: demo.url === previewURL })}
                onClick={() => onChangeSample(demo.id)}
              >
                {`${t('music')}${demo.id + 1}`}
                {demo.isSample ? null : (
                  <span className="AudioTagger-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            {/* <li className={cn('AudioTagger-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="audio/wav, audio/mp3" />
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AudioTagger