import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './SingingConversion.scss'
import { Uploader, Spinner } from 'common'
import { getJob, createJob, readFile, POLLING_INTERVAL, BACK_ENV, putObjectSlice, getTempUrl, CDN_COS } from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back13.jpg`

/** Types */
type Demo = {
  id: number
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result?: string
  uploading?: boolean
}

/** Variables */
const COS_Prefix = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/singingConver'
const CancelTokenStatic = axiosStatic.CancelToken

const demos: Demo[] = [
  {
    id: 0,
    url: `${COS_Prefix}/yesterday21.mp3`,
    jobId: '1',
    isSample: true,
    result: `${COS_Prefix}/yesterday21_vocal_base_female1.wav`,
  },
  {
    id: 1,
    url: `${COS_Prefix}/shinian36.mp3`,
    jobId: '2',
    isSample: true,
    result: `${COS_Prefix}/shinian36_vocal_base_female.wav`,
  },
  {
    id: 2,
    url: `${COS_Prefix}/shapeofyou4.mp3`,
    jobId: '3',
    isSample: true,
    result: `${COS_Prefix}/shapeofyou4_vocal_base_female.wav`,
  },
  {
    id: 3,
    url: `${COS_Prefix}/qiying40.mp3`,
    jobId: '4',
    isSample: true,
    result: `${COS_Prefix}/qiying40_vocal_base_female.wav`,
  },
]

/** Functions */
async function uploadAudio(file: File) {
  const cosKey = `${BACK_ENV}/singingconver/${file.size}-${file.name}`
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      outputPrefix: `${Math.random().toString(36).slice(-6)}`,
      singingConversion: {
        outputFormat: 1
      }
    },
    `assets/singingConver`,
  )
}

const SingingConversion: React.FC = () => {
  const audioOriginRef = useRef<HTMLAudioElement>(null)
  const audioResultRef = useRef<HTMLAudioElement>(null)

  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('singingConversion')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<string>()

  const [MSG, setMSG] = useState<string | number>('')

  useEffect(() => {
    const requestStack = requestStackRef.current

    return () => {
      requestStack.forEach((source) => {
        source.cancel('Exit page')
      })
    }
  }, [])

  useEffect(() => {
    audioResultRef.current?.pause()
    const requestStack = requestStackRef.current

    async function request() {
      const demo = demos.find((demo) => demo.jobId === currentTuuid)
      if (!demo) return
      if (demo.result) {
        return setResult(demo.result)
      }

      if (tuuidRef.current === currentTuuid) {
        setResult(undefined)
        setMSG('')
      }
      const source = CancelTokenStatic.source()
      requestStack.push(source)

      try {
        const data = await getJob(currentTuuid, source.token)
        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          console.log(job);
          let songName = job.outputs[0].smartContentResult?.singingConversion?.songName

          demo.result = `https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/singingConver/${songName}`

          tuuidRef.current === currentTuuid && setResult(demo.result)
        } else {
          if (data.errorResponse) {
            tuuidRef.current === currentTuuid && setMSG(data.errorResponse.message)
          } else if (job) {
            if (job.state === 4) {
              tuuidRef.current === currentTuuid && setMSG('Job Failed')
            } else if ([1, 2].includes(job.state) && tuuidRef.current === currentTuuid) {
              setTimeout(request, POLLING_INTERVAL)
            }
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

        const demo: Demo = {
          id: demos[demos.length - 1].id + 1,
          url,
          jobId: '',
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
          } else {
            setMSG(data.errorResponse?.message || 'Upload Failed')
          }
        } catch (e) {
          setMSG('500')
          console.log(e)
        } finally {
          setLoadingTuuid(false)
          demo.uploading = false
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
    <div className="SingingConver">
      <div
        className="SingingConver-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="SingingConver-banner-content">
          <h2 className="SingingConver-banner-title">{t`singingConversion`}</h2>
          <p className="SingingConver-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="SingingConver-demo">
        <div className="SingingConver-main">
          <div className="SingingConver-preview">
            <h2 className="SingingConver-main-title">{t`originalMusic`}</h2>
            <audio
              ref={audioOriginRef}
              onPlay={() => audioResultRef.current?.pause()}
              src={previewURL}
              controls
              controlsList="nodownload"
            ></audio>
          </div>
          <div className="SingingConver-result">
            <h2 className="SingingConver-main-title">{t`processedMusic`}</h2>
            <div
              className={cn('SingingConver-result-wrap', {
                loading: loadingTuuid || (!result && !MSG),
              })}
            >
              {MSG && !result ? (
                <div className="SingingConver-result-message">{`${t`tip.processedFailed`} (${MSG})`}</div>
              ) : (
                <audio
                  ref={audioResultRef}
                  onPlay={() => audioOriginRef.current?.pause()}
                  src={result}
                  controls
                  controlsList="nodownload"
                ></audio>
              )}
              <div className="SingingConver-result-cover">
                <Spinner size={'20px'} />
                <p className="SingingConver-result-cover-status">
                  {t(`tip.${loadingTuuid ? 'uploadingMusic' : 'processingMusic'}`)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="SingingConver-sample">
          <ul className="SingingConver-sample-list">
            {demos.map((demo, index) => (
              <li
                key={demo.url}
                className={cn('SingingConver-sample-item', { active: demo.url === previewURL })}
                onClick={() => onChangeSample(demos[index])}
              >
                {`${t('music')}${demo.id + 1}`}
                {demo.isSample ? null : (
                  <span className="SingingConver-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('SingingConver-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="audio/wav, audio/mp3" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SingingConversion
