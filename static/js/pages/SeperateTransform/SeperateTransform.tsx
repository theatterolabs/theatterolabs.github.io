import React, { useState, useEffect, useRef, useCallback } from 'react'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

import './SeperateTransform.scss'
import { Uploader, Spinner } from 'common'
import {
  Seperate,
  getJob,
  createJob,
  readFile,
  POLLING_INTERVAL,
  BACK_ENV,
  getTempUrl,
  putObjectSlice,
  SeperateResults,
  CDN_COS,
} from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back9.jpg`
/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const seperates: Seperate[] = ['original', 'vocals', 'drums', 'bass', 'accompaniment']

type Result = {
  [key in Seperate]?: string
}

type Demo = {
  id: number
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  ref?: HTMLAudioElement
  result: Result
  uploading?: boolean
}

const demos: Demo[] = [
  {
    id: 0,
    jobId: '1',
    isSample: true,
    result: {
      original: `${CDN_COS}/assets/seperate/sample1.mp3`,
      ...SeperateResults[0],
    },
  },
  {
    id: 1,
    jobId: '2',
    isSample: true,
    result: {
      original: `${CDN_COS}/assets/seperate/sample2.mp3`,
      ...SeperateResults[1],
    },
  },
  {
    id: 2,
    jobId: '3',
    isSample: true,
    result: {
      original: `${CDN_COS}/assets/seperate/sample3.mp3`,
      ...SeperateResults[2],
    },
  },
  {
    id: 3,
    jobId: '4',
    isSample: true,
    result: {
      original: `${CDN_COS}/assets/seperate/sample4.mp3`,
      ...SeperateResults[3],
    },
  },
]

function EnumToTone(style: number): Seperate {
  switch (style) {
    case 1:
      return 'vocals'
    case 2:
      return 'drums'
    case 3:
      return 'bass'
    default:
      //case 5
      return 'accompaniment'
  }
}
/** Functions */
async function uploadAudio(file: File) {
  const cosKey = `${BACK_ENV}/music/seperate/${file.size}-${file.name}`
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      outputPrefix: `${Math.random().toString(36).slice(-6)}`,
      musicSeperate: {
        method: 2,
      },
    },
    `assets/seperateTransofrm`,
  )
}

const SeperateTransform: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('seperateTransform')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [currentGenre, setCurrentGenre] = useState<Seperate>(seperates[0])
  const [autoPlay, setAutoPlay] = useState(false)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<Result>(demos[0].result)
  const resultRef = useRef(demos[0].result.original)

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

      if (Object.keys(demo.result).length > 1) {
        return setResult(demo.result)
      }
      const source = CancelTokenStatic.source()
      requestStack.push(source)

      try {
        const data = await getJob(currentTuuid, source.token)

        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          const result = {} as Result
          result.original = demo.result.original
          job.outputs[0].smartContentResult?.musicSeperate?.forEach(({ fileName, tone }) => {
            result[
              EnumToTone(tone)
            ] = `https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/seperateTransofrm/${fileName}`
          })
          demo.result = result
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

    currentTuuid && request()
  }, [currentTuuid])

  const switchDemo = useCallback((demo: Demo) => {
    setCurrentTuuid(demo.jobId)
    tuuidRef.current = demo.jobId

    setResult(demo.result)
    resultRef.current = demo.result.original

    setCurrentGenre(seperates[0])
    setAutoPlay(false)

    setLoadingTuuid(!!demo.uploading)
  }, [])

  const onUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || !files.length) return

      const file = files[0]
      const target = await readFile(file)

      if (target) {
        const originalURL = target.result as string

        const duplicateDemo = demos.find((demo) => demo.result.original === originalURL)
        if (duplicateDemo) {
          switchDemo(duplicateDemo)

          return
        }

        const demo: Demo = {
          id: demos[demos.length - 1].id + 1,
          jobId: '',
          result: {
            original: originalURL,
          },
        }
        demos.push(demo)

        setResult(demo.result)
        resultRef.current = demo.result.original

        setCurrentTuuid('')
        setCurrentGenre(seperates[0])
        setAutoPlay(false)

        /** Upload audio */
        setLoadingTuuid(true)
        demo.uploading = true

        try {
          const data = await uploadAudio(file)
          if (data.createJobResponse?.job?.id) {
            demo.jobId = data.createJobResponse.job.id
            if (resultRef.current === demo.result.original) {
              setCurrentTuuid(demo.jobId)
              setResult(demo.result)
            }
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
    (demo: Demo) => {
      if (demo && result !== demo.result) {
        switchDemo(demo)
      }
    },
    [result, switchDemo],
  )

  const onChangeStyle = useCallback((style: Seperate) => {
    setAutoPlay(true)
    setCurrentGenre(style)
  }, [])

  const onDelete = useCallback(
    (index: number, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation()

      const demo = demos[index]

      if (demo.uploading && demo.source) {
        demo.source.cancel('Cancel Upload')
      }

      if (result === demo.result) switchDemo(demos[index - 1])

      demos.splice(index, 1)
      setDemosLength(demosLength - 1)
    },
    [result, demosLength, switchDemo],
  )

  return (
    <div className="SeperateTransform">
      <div
        className="SeperateTransform-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="SeperateTransform-banner-content">
          <h2 className="SeperateTransform-banner-title">{t`seperateTransform`}</h2>
          <p className="SeperateTransform-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="SeperateTransform-demo">
        <div className="SeperateTransform-main">
          <div className="SeperateTransform-preview">
            <audio
              src={result[currentGenre]}
              autoPlay={autoPlay}
              controls
              controlsList="nodownload"
              onPlay={() => setAutoPlay(true)}
            />
          </div>

          <div
            className={cn('SeperateTransform-result', {
              loading: Object.keys(result).length === 1,
            })}
          >
            <ul className="SeperateTransform-result-list">
              {seperates.map((seperate) => (
                <li
                  key={seperate}
                  className={cn('SeperateTransform-result-item', {
                    active: currentGenre === seperate,
                  })}
                  onClick={() => onChangeStyle(seperate)}
                >
                  {t(`seperate.${seperate}`)}
                </li>
              ))}
            </ul>
            <div
              className={cn('SeperateTransform-result-cover', {
                loading: loadingTuuid,
              })}
            >
              <Spinner />
              <p className="SeperateTransform-result-status">{t(`tip.uploadingAudio`)}</p>
            </div>
          </div>
        </div>

        <div className="SeperateTransform-sample">
          <ul className="SeperateTransform-sample-list">
            {demos.map((demo, index) => (
              <li
                key={demo.result.original}
                className={cn('SeperateTransform-sample-item', { active: demo.result === result })}
                onClick={() => onChangeSample(demos[index])}
              >
                {`${t('music')}${demo.id + 1}`}
                {demo.isSample ? null : (
                  <span className="SeperateTransform-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('SeperateTransform-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="audio/wav, audio/mp3" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SeperateTransform
