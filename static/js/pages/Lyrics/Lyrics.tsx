import React, { useState, useRef, useEffect, useCallback, ChangeEventHandler } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './Lyrics.scss'
import { Button, LyricsPannel } from 'common'
import { getJob, createJob, POLLING_INTERVAL, LyricsResponse, LyricsResults, CDN_COS } from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back14.jpg`
/** Types */
type Demo = {
  id: number
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result?: LyricsResponse[]
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const demos: Demo[] = [
  {
    id: 0,
    jobId: '1',
    isSample: true,
    result: LyricsResults[0],
  },
  {
    id: 1,
    jobId: '2',
    isSample: true,
    result: LyricsResults[1],
  },
  {
    id: 2,
    jobId: '3',
    isSample: true,
    result: LyricsResults[2],
  },
  {
    id: 3,
    jobId: '4',
    isSample: true,
    result: LyricsResults[3],
  },
]

/** Functions */
async function uploadKeyword(word: string, pattern?: string) {
  return await createJob(
    { sourceData: word },
    {
      lyricsGenerator: {
        option: 3,
        pattern: [pattern || 'AAABBBCCC'],
      },
    },
  )
}

const Lyrics: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('lyrics')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [textValue, setTextValue] = useState('')
  // const [rhyme, setRhyme] = useState('AAAABBBB')

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<LyricsResponse[]>()

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
          demo.result = job.outputs[0].smartContentResult?.lyricsGenerator

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
  }, [])

  const onUpload = useCallback(async () => {
    if (!textValue || !/^[\u4e00-\u9fa5]{1,20}$/.test(textValue)) {
      alert('Invalid Input')
      return
    }

    const demo: Demo = { id: demos[demos.length - 1].id + 1, jobId: '' }
    demos.push(demo)

    setCurrentTuuid('')
    setResult(undefined)

    try {
      setTextValue('')
      const data = await uploadKeyword(textValue)
      if (data.createJobResponse?.job?.id) {
        demo.jobId = data.createJobResponse.job.id
        setCurrentTuuid(data.createJobResponse.job.id)
        tuuidRef.current = demo.jobId
      }
    } catch (e) {
      console.log(e)
    }
  }, [textValue])

  const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    const value = e.target.value
    setTextValue(value)
  }, [])

  // const onRhymeChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
  //   const value = e.target.value
  //   setRhyme(value)
  // }, [])

  const onChangeSample = useCallback(
    (index: number) => {
      const demo = demos[index]

      if (tuuidRef.current === demo.jobId) return

      switchDemo(demo)
    },

    [switchDemo],
  )

  const onDelete = useCallback(
    (index: number, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation()

      const demo = demos[index]

      if (demo.source) {
        demo.source.cancel('Cancel Upload')
      }

      if (tuuidRef.current === demo.jobId) switchDemo(demos[index - 1])

      demos.splice(index, 1)
      setDemosLength(demosLength - 1)
    },
    [switchDemo, demosLength],
  )

  return (
    <div className="Lyrics">
      <div
        className="Lyrics-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="Lyrics-banner-content">
          <h2 className="Lyrics-banner-title">{t`lyrics`}</h2>
          <p className="Lyrics-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="Lyrics-demo">
        <div className="Lyrics-main">
          <div className="Lyrics-result">
            <div className="tab-wrapper">
              <div className="tab-pane">{<LyricsPannel result={result ? result[0] : undefined} />}</div>
            </div>
          </div>
        </div>

        <div className="Lyrics-sample">
          <ul className="Lyrics-sample-list">
            {demos.map((demo, index) => (
              <li
                key={demo.jobId}
                className={cn('Lyrics-sample-item', { active: demo.jobId === tuuidRef.current })}
                onClick={() => onChangeSample(index)}
              >
                {`${t('demo')}${demo.id + 1}`}
                {demo.isSample ? null : (
                  <span className="Lyrics-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('Lyrics-sample-item', 'Lyrics-inputer')}>
              <textarea
                className="Lyrics-input-textarea"
                value={textValue}
                onChange={onTextChange}
                placeholder={t`tip.inputKeyword`}
                style={{ resize: 'none' }}
              />
              {/* <select value={rhyme} onChange={onRhymeChange}>
                <option value="AAAABBBB">AAAABBBB</option>
                <option value="AABBCCDD">AABBCCDD</option>
              </select> */}
              <div className="Lyrics-inputer-bottom">
                <div className="Lyrics-inputer-bottom-wrapper">
                  <Button onClick={onUpload}>{t`btn.upload`}</Button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Lyrics
