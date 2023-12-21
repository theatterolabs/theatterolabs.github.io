import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './ImageCaption.scss'
import { Uploader, Tabs, Spinner, CaptionResult } from 'common'
import { getJob, createJob, readFile, POLLING_INTERVAL, putObject, getTempUrl, BACK_ENV, CDN_COS } from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back1.jpg`
/** Types */
type Demo = {
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result?: (string | undefined)[]
  uploading?: boolean
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const TabPane = Tabs.TabPane

const demos: Demo[] = [
  {
    url: `${CDN_COS}/assets/caption/sample1.jpg`,
    jobId: '1',
    isSample: true,
    result: ['一个穿着短袖上衣的男人在运动场上打网球', 'A man on a tennis court swinging a tennis racket.'],
  },
  {
    url: `${CDN_COS}/assets/caption/sample2.jpg`,
    jobId: '2',
    isSample: true,
    result: ['一群人在餐厅里交谈。', 'A group of people sitting around a table with wine glasses.'],
  },
  {
    url: `${CDN_COS}/assets/caption/sample3.jpg`,
    jobId: '3',
    isSample: true,
    result: ['一个飞机飞起来的飞机。', 'A large passenger jet flying through the air.'],
  },
  {
    url: `${CDN_COS}/assets/caption/sample4.jpg`,
    jobId: '4',
    isSample: true,
    result: ['一个男人在玩滑板。', 'A man riding a skateboard down a ramp.'],
  },
]

/** Functions */
async function uploadPicture(file: File) {
  const cosKey = `${BACK_ENV}/picture/caption/${file.size}-${file.name.replace('.jpeg', '.jpg')}`
  await putObject(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      visualCaption: 2,
    },
  )
}

const ImageCaption: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('imageCaption')

  const [mode, setMode] = useState<React.ReactText>('chinese')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<(string | undefined)[]>()

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
          demo.result = [
            job.outputs[0].smartContentResult?.visualCaption?.chinese,
            job.outputs[0].smartContentResult?.visualCaption?.english,
          ]

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

    setMode('chinese')

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
          const data = await uploadPicture(file)
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
    <div className="ImageCaption">
      <div
        className="ImageCaption-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="ImageCaption-banner-content">
          <h2 className="ImageCaption-banner-title">{t`imageCaption`}</h2>
          <p className="ImageCaption-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="ImageCaption-demo">
        <div className="ImageCaption-main">
          <div className="ImageCaption-preview">
            <img src={previewURL} alt="Error URL" />
          </div>
          <div className="ImageCaption-result">
            <div className="tab-wrapper">
              <Tabs activeKey={mode} onChange={setMode}>
                <TabPane title={t`chinese`} paneKey="chinese">
                  <div className="tab-pane">
                    <CaptionResult result={result ? result[0] || 'Error' : undefined} />
                  </div>
                </TabPane>
                <TabPane title={t`english`} paneKey="english">
                  <div className="tab-pane">
                    <CaptionResult result={result ? result[1] || 'Error' : undefined} />
                  </div>
                </TabPane>
              </Tabs>
            </div>
            <div
              className={cn('ImageCaption-result-placeholder', {
                loading: loadingTuuid,
              })}
            >
              <Spinner />
              <p className="ImageCaption-result-placeholder-status">{t`tip.uploadingPicture`}</p>
            </div>
          </div>
        </div>

        <div className="ImageCaption-sample">
          <ul className="ImageCaption-sample-list">
            {demos.map(({ isSample, url }, index) => (
              <li
                key={url}
                className={cn('ImageCaption-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(index)}
              >
                <img src={url} alt={`demo${index}`} />
                {isSample ? null : (
                  <span className="ImageDescription-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('ImageCaption-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="image/jpg" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ImageCaption
