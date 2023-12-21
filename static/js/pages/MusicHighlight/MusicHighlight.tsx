import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './MusicHighlight.scss'
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
  result?: {start: number, end: number, score: number}[] 
  uploading?: boolean
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const demos: Demo[] = [
  {
    id: 0,
    url: `${CDN_COS}/assets/highlight/sample5.mp3`,
    jobId: '1',
    isSample: true,
    result: [{start: 60.937, end: 94.122, score: 1},
    {start: 158.847, end: 223.736, score: 1}],
  },
  {
    id: 1,
    url: `${CDN_COS}/assets/highlight/sample6.mp3`,
    jobId: '2',
    isSample: true,
    result: [{start: 53.907, end: 82.433, score: 1}, {start: 118.439, end: 147.769, score: 1}, {start: 153.791, end: 183.333, score: 1}],
  },
  {
    id: 2,
    url: `${CDN_COS}/assets/highlight/sample7.mp3`,
    jobId: '3',
    isSample: true,
    result: [{start: 45.737, end: 74.17, score: 1},{start: 103.095, end: 131.652, score: 1},{start: 157.114, end: 185.593, score: 1}],
  },
  {
    id: 3,
    url: `${CDN_COS}/assets/highlight/sample8.mp3`,
    jobId: '4',
    isSample: true,
    result: [{start: 69.843, end: 97.784, score: 1}, {start:136.844, end: 237.993, score: 1}],
  },
]

/** Functions */
async function uploadAudio(file: File) {
  const cosKey = `${BACK_ENV}/music/highlight/${file.size}-${file.name}`
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      musicHighlight: 2,
    },
  )
}

const MusicHighlight: React.FC = () => {
  const audioOriginRef = useRef<HTMLAudioElement>(null)
  const audioResultRef1 = useRef<HTMLAudioElement>(null)
  const audioResultRef2 = useRef<HTMLAudioElement>(null)
  const audioResultRef3 = useRef<HTMLAudioElement>(null)
  const audioResultRef4 = useRef<HTMLAudioElement>(null)
  const audioResultRef5 = useRef<HTMLAudioElement>(null)
  const audioResultRefs = [audioResultRef1, audioResultRef2, audioResultRef3, audioResultRef4, audioResultRef5]

  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('musicHighlight')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<[number, number, number][]>()

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
    const requestStack = requestStackRef.current

    async function request() {
      const demo = demos.find((demo) => demo.jobId === currentTuuid)
      if (!demo) return
      if (demo.result) {
        return setResult(demo.result.map(r => [r.start, r.end, r.score]))
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
          demo.result = job.outputs[0].smartContentResult?.musicHighlight?.map(r => {
            return {
              start: parseFloat(parseFloat(r.start).toFixed(3)),
              end: parseFloat(parseFloat(r.end).toFixed(3)),
              score: parseFloat(parseFloat(r.score).toFixed(3))
            }
          })
          tuuidRef.current === currentTuuid && setResult(demo.result?.map(r => [r.start, r.end, r.score]))
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

        /** Remove the source when request is finished */
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
            previewURLRef.current === demo.url && setCurrentTuuid(demo.jobId)

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
    <div className="MusicHighlight">
      <div
        className="MusicHighlight-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="MusicHighlight-banner-content">
          <h2 className="MusicHighlight-banner-title">{t`musicHighlight`}</h2>
          <p className="MusicHighlight-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="MusicHighlight-demo">
        <div className="MusicHighlight-main">
          <div className="MusicHighlight-preview">
            <h2 className="MusicHighlight-main-title">{t`originalAudio`}</h2>
            <audio
              ref={audioOriginRef}
              onPlay={(e) => {
                audioResultRefs.forEach(c => c.current?.pause())
              }}
              src={previewURL}
              controls
              controlsList="nodownload"
            />
          </div>
          <div className="MusicHighlight-result">
            <h2 className="MusicHighlight-main-title">{t`processedAudio`}</h2>
            <div
              className={cn('MusicHighlight-result-wrap', {
                loading: loadingTuuid || (!result && !MSG),
              })}
            >
              {MSG && !result ? (
                <div className="MusicHighlight-result-message">{`${t`tip.processedFailed`} (${MSG})`}</div>
              ) : (result && result.length ? 
                result.map((r, index) => {
                  return (
                    <div key={index}>
                      <h2 className="MusicHighlight-main-info">{`${t`highlightStart`}: ${r[0]}, ${t`highlightEnd`}: ${r[1]}, ${t`highlightScore`}: ${r[2]*100}%`}</h2>
                      <audio 
                        ref={audioResultRefs[index]}
                        src={previewURL}
                        onPlay={(e) => {
                          audioOriginRef.current?.pause()
                          audioResultRefs.forEach((c, ai) => {
                            if(ai !== index) {
                              c.current?.pause()
                            }
                          })
                          const target = e.target as HTMLAudioElement
                          if (target.currentTime < r[0] || target.currentTime > r[1] ) {
                            target.currentTime = r[0] 
                          }
                        }}
                        onTimeUpdate={(e) => {
                          const target = e.target as HTMLAudioElement
                          if(target.currentTime > r[1]) {
                             target.pause()
                          }
                        }}
                        controls
                        controlsList="nodownload"
                        />
                      </div>
                  )
                })
              : <div className="MusicHighlight-result-message">{`${t`tip.emptyResult`}`}</div>)}
              <div className="MusicHighlight-result-cover">
                <Spinner size={'20px'} />
                <p className="MusicHighlight-result-cover-status">
                  {t(`tip.${loadingTuuid ? 'uploadingAudio' : 'processingAudio'}`)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="MusicHighlight-sample">
          <ul className="MusicHighlight-sample-list">
            {demos.map((demo, index) => (
              <li
                key={demo.url}
                className={cn('MusicHighlight-sample-item', { active: demo.url === previewURL })}
                onClick={() => onChangeSample(demos[index])}
              >
                {`${t('music')}${demo.id + 1}`}
                {demo.isSample ? null : (
                  <span className="MusicHighlight-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('MusicHighlight-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="audio/wav, audio/mp3" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MusicHighlight
