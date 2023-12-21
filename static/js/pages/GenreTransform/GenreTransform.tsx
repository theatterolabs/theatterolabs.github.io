import React, { useState, useEffect, useRef, useCallback } from 'react'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

import './GenreTransform.scss'
import { Uploader, Spinner } from 'common'
import {
  getJob,
  createJob,
  readFile,
  POLLING_INTERVAL,
  BACK_ENV,
  getTempUrl,
  putObjectSlice,
  Style,
  GenreResults,
  CDN_COS,
} from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back5.jpg`
/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const genres: Style[] = ['original', 'opera', 'pop', 'chinese', 'light']

type Result = {
  [key in Style]?: string
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
      original: `${CDN_COS}/assets/genre/sample1.wav`,
      ...GenreResults[0],
    },
  },
  {
    id: 1,
    jobId: '2',
    isSample: true,
    result: {
      original: `${CDN_COS}/assets/genre/sample2.mp3`,
      ...GenreResults[1],
    },
  },
  {
    id: 2,
    jobId: '3',
    isSample: true,
    result: {
      original: `${CDN_COS}/assets/genre/sample3.wav`,
      ...GenreResults[2],
    },
  },
  {
    id: 3,
    jobId: '4',
    isSample: true,
    result: {
      original: `${CDN_COS}/assets/genre/sample4.wav`,
      ...GenreResults[3],
    },
  },
]

function EnumToStyle(style: number): Style {
  switch (style) {
    case 6:
      return 'opera'
    case 1:
      return 'pop'
    case 8:
      return 'light'
    default:
      //case 9
      return 'chinese'
  }
}

/** Functions */
async function uploadAudio(file: File) {
  const cosKey = `${BACK_ENV}/music/genre/${file.size}-${file.name}`
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      outputPrefix: `${Math.random().toString(36).slice(-6)}`,
      musicStyleTransform: {
        styles: [1, 6, 8, 9],
      },
    },
    `assets/genre`,
  )
}

const GenreTransform: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('genreTransform')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [currentGenre, setCurrentGenre] = useState<Style>(genres[0])
  const [autoPlay, setAutoPlay] = useState(false)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<Result>(demos[0].result)
  const [MSG, setMSG] = useState<string | number>('')
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

      if (tuuidRef.current === currentTuuid) {
        setMSG('')
      }
      const source = CancelTokenStatic.source()
      requestStack.push(source)

      try {
        const data = await getJob(currentTuuid, source.token)
        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          const result = {} as Result
          result.original = demo.result.original
          job.outputs[0].smartContentResult?.musicStyleTransform?.forEach(({ fileName, style }) => {
            result[
              EnumToStyle(style)
            ] = `https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/genre/${fileName}`
          })
          demo.result = result
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

    setResult(demo.result)
    resultRef.current = demo.result.original

    setCurrentGenre(genres[0])
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
        setCurrentGenre(genres[0])
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
          } else {
            setMSG(data.errorResponse?.message || 'Upload Failed')
          }
        } catch (e) {
          console.log(e)
          setMSG('500')
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
      if (demo && result !== demo.result) {
        switchDemo(demo)
      }
    },
    [result, switchDemo],
  )

  const onChangeStyle = useCallback((style: Style) => {
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
    <div className="GenreTransform">
      <div
        className="GenreTransform-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="GenreTransform-banner-content">
          <h2 className="GenreTransform-banner-title">
            {t`genreTransform`} <span className="GenreTransform-banner-title-tag">Beta</span>
          </h2>
          <p className="GenreTransform-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="GenreTransform-demo">
        <div className="GenreTransform-main">
          <div className="GenreTransform-preview">
            <audio
              src={result[currentGenre]}
              autoPlay={autoPlay}
              controls
              controlsList="nodownload"
              onPlay={() => setAutoPlay(true)}
            />
          </div>

          <div
            className={cn('GenreTransform-result', {
              loading: !result.chinese || MSG,
            })}
          >
            {MSG ? (
              <div className="GenreTransform-result-message">{`${t`tip.processedFailed`} (${MSG})`}</div>
            ) : (
              <>
                <ul className="GenreTransform-result-list">
                  {genres.map((genre) => (
                    <li
                      key={genre}
                      className={cn('GenreTransform-result-item', {
                        active: currentGenre === genre,
                      })}
                      onClick={() => onChangeStyle(genre)}
                    >
                      {t(`genre.${genre}`)}
                    </li>
                  ))}
                </ul>
                <div
                  className={cn('GenreTransform-result-cover', {
                    loading: loadingTuuid,
                  })}
                >
                  <Spinner size="20px" />
                  <p className="GenreTransform-result-status">{t(`tip.uploadingAudio`)}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="GenreTransform-sample">
          <ul className="GenreTransform-sample-list">
            {demos.map((demo, index) => (
              <li
                key={demo.result.original}
                className={cn('GenreTransform-sample-item', { active: demo.result === result })}
                onClick={() => onChangeSample(demos[index])}
              >
                {`${t('music')}${demo.id + 1}`}
                {demo.isSample ? null : (
                  <span className="GenreTransform-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('GenreTransform-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="audio/wav, audio/mp3" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GenreTransform
