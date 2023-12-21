import React, { useState, useEffect, useRef, useCallback } from 'react'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

import './InstrumentTransform.scss'
import { Uploader, Spinner } from 'common'
import {
  readFile,
  POLLING_INTERVAL,
  BACK_ENV,
  getTempUrl,
  putObjectSlice,
  getJob,
  createJob,
  Instrument,
  InstrumentResults,
  CDN_COS,
} from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back6.jpg`
/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const instruments: Instrument[] = [
  'original',
  'Harp',
  'MusicBox',
  'Luan',
  'Trombone',
  'AcousticGuitar',
  'Clarine',
  'Cello',
  'Sax',
  'Flute',
  'Pipa',
  'GuZheng',
  'Marimba',
  'Dulcimer',
  'Accordion',
]

type Result = {
  [key in Instrument]?: string
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
      original: `${CDN_COS}/assets/instruments/sample1.mp3`,
      ...InstrumentResults[0],
    },
  },
  {
    id: 1,
    jobId: '2',
    isSample: true,
    result: {
      original: `${CDN_COS}/assets/instruments/sample2.mp3`,
      ...InstrumentResults[1],
    },
  },
  {
    id: 2,
    jobId: '3',
    isSample: true,
    result: {
      original: `${CDN_COS}/assets/instruments/sample3.mp3`,
      ...InstrumentResults[2],
    },
  },
  {
    id: 3,
    jobId: '4',
    isSample: true,
    result: {
      original: `${CDN_COS}/assets/instruments/sample4.mp3`,
      ...InstrumentResults[3],
    },
  },
]

/** Functions */
async function uploadAudio(file: File) {
  const cosKey = `${BACK_ENV}/music/instrumentTransform/${file.size}-${file.name}`
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      outputPrefix: `${Math.random().toString(36).slice(-6)}`,
      musicInstrumentTransform: {
        instruments: [23, 26, 28, 11, 14, 13, 9, 18, 10, 27, 29, 20, 21, 22],
      },
    },
    `${BACK_ENV}/result/instrumentTransform`,
  )
}

const InstrumentTransform: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('instrumentTransform')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [currentGenre, setCurrentGenre] = useState<Instrument>(instruments[0])
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
          job.outputs[0].smartContentResult?.musicInstrumentTransform?.forEach(({ fileName }) => {
            // TODO
            result.Pipa = fileName
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

    setCurrentGenre(instruments[0])
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
        setCurrentGenre(instruments[0])
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

  const onChangeStyle = useCallback((style: Instrument) => {
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
    <div className="InstrumentTransform">
      <div
        className="InstrumentTransform-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="InstrumentTransform-banner-content">
          <h2 className="InstrumentTransform-banner-title">{t`instrumentTransform`}</h2>
          <p className="InstrumentTransform-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="InstrumentTransform-demo">
        <div className="InstrumentTransform-main">
          <div className="InstrumentTransform-preview">
            <audio
              src={result[currentGenre]}
              autoPlay={autoPlay}
              controls
              controlsList="nodownload"
              onPlay={() => setAutoPlay(true)}
            />
          </div>

          <div
            className={cn('InstrumentTransform-result', {
              loading: Object.keys(result).length === 1,
            })}
          >
            <ul className="InstrumentTransform-result-list">
              {instruments.map((instrument) => (
                <li
                  key={instrument}
                  className={cn('InstrumentTransform-result-item', {
                    active: currentGenre === instrument,
                  })}
                  onClick={() => onChangeStyle(instrument)}
                >
                  {t(`instrument.${instrument}`)}
                </li>
              ))}
            </ul>
            <div
              className={cn('InstrumentTransform-result-cover', {
                loading: loadingTuuid,
              })}
            >
              <Spinner size={'20px'} />
              <p className="InstrumentTransform-result-status">{t(`tip.uploadingAudio`)}</p>
            </div>
          </div>
        </div>

        <div className="InstrumentTransform-sample">
          <ul className="InstrumentTransform-sample-list">
            {demos.map((demo, index) => (
              <li
                key={demo.result.original}
                className={cn('InstrumentTransform-sample-item', { active: demo.result === result })}
                onClick={() => onChangeSample(demos[index])}
              >
                {`${t('music')}${demo.id + 1}`}
                {demo.isSample ? null : (
                  <span className="InstrumentTransform-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li style={{ display: 'none' }} className={cn('InstrumentTransform-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="audio/wav, audio/mp3, video/mp4" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InstrumentTransform
