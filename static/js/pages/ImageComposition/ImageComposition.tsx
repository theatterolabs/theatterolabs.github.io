import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './ImageComposition.scss'
import { Uploader, Spinner } from 'common'
import { getJob, createJob, readFile, POLLING_INTERVAL, putObject, getTempUrl, BACK_ENV, CDN_COS } from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back1.jpg`
/** Types */
type Demo = {
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  outputUrl?: string
  uploading?: boolean
  name?:string
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const COS_PREFIX = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/imageComposition'

const demos: Demo[] = [
  {
    url: COS_PREFIX + '/quiet.jpeg',
    jobId: '1',
    isSample: true,
    outputUrl: COS_PREFIX + '/quiet.mp3',
    name:'安静'
  },
  {
    url: COS_PREFIX + '/lazy.jpg',
    jobId: '2',
    isSample: true,
    outputUrl: COS_PREFIX + '/lazy.mp3',
    name:'慵懒'
  },
  {
    url: COS_PREFIX + '/magnificent.jpeg',
    jobId: '3',
    isSample: true,
    outputUrl: COS_PREFIX + '/magnificent.mp3',
    name:'恢弘'
  },
  {
    url: COS_PREFIX + '/sad.jpg',
    jobId: '4',
    isSample: true,
    outputUrl: COS_PREFIX + '/sad.mp3',
    name:'伤感'
  }
]

/** Functions */
async function uploadPicture(file: File) {
  const cosKey = `${BACK_ENV}/picture/imgcomp/${file.size}-${file.name.replace('.jpeg', '.jpg')}`
  await putObject(file, cosKey)
  const url = await getTempUrl(cosKey)


  return await createJob(
    { url },
    {
      "outputPrefix": "",
      "imageBgmGeneration": {
        "songQuantity": 1
      },
    },
    '/assets/imagecomp'
  )
}

const ImageComposition: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('imageComposition')


  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [outputUrl, setOutputUrl] = useState<string | undefined>(demos[0].outputUrl || '')
  // const resultURLRef = useRef(demos[0].result)

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

      if (demo.outputUrl) {
        return setOutputUrl(demo.outputUrl)
      }
      tuuidRef.current === currentTuuid && setOutputUrl('')

      const source = CancelTokenStatic.source()
      requestStack.push(source)

      try {
        const data = await getJob(currentTuuid, source.token)
        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          console.log(job)
          setLoadingTuuid(false);
          
          let songName = job.outputs[0].smartContentResult?.imageBgmGeneration?.[0].songName

          demo.outputUrl = `https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/imagecomp/${songName}`

          tuuidRef.current === currentTuuid && setOutputUrl(demo.outputUrl)

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
  }, [currentTuuid, outputUrl])



  const switchDemo = useCallback((demo: Demo) => {
    setCurrentTuuid(demo.jobId)
    tuuidRef.current = demo.jobId

    setOutputUrl(demo.outputUrl)

    setPreviewURL(demo.url)
    previewURLRef.current = demo.url

    setLoadingTuuid(!!demo.uploading)
  }, [])

  const onChangeSample = useCallback(
    (index: number) => {
      const demo = demos[index]

      if (previewURL === demo.url) return

      switchDemo(demo)
    },

    [previewURL, switchDemo],
  )

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

        const demo: Demo = { url, jobId: '', outputUrl:'' }
        demos.push(demo)

        setPreviewURL(demo.url)
        previewURLRef.current = demo.url

        setCurrentTuuid('')
        setOutputUrl('')

        setLoadingTuuid(true)
        demo.uploading = true

        try {
          const data = await uploadPicture(file)
          if (data.createJobResponse?.job?.id) {
            demo.jobId = data.createJobResponse.job.id
            previewURLRef.current === demo.url && setCurrentTuuid(data.createJobResponse.job.id)
            tuuidRef.current = demo.jobId
          }

          //setLoadingTuuid(false)
          //demo.uploading = false
        } catch (e) {
          console.log(e)
        }finally {
          setLoadingTuuid(false)
          demo.uploading = false
        }
      }
    },
    [switchDemo],
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
    <div className="ImageComposition">
      <div
        className="ImageComposition-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="ImageComposition-banner-content">
          <h2 className="ImageComposition-banner-title">{t`imageComposition`}</h2>
          <p className="ImageComposition-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="ImageComposition-demo">
        <div className="ImageComposition-titles">
          <h2 className="ImageComposition-titles-title1">{t`originalImg`}</h2>
          <h2 className="ImageComposition-titles-title2">{t`processedMusic`}</h2>
        </div>
        <div className="ImageComposition-main">
          
          <div className="ImageComposition-preview">
            <img src={previewURL} alt="Error URL" />
          </div>
          
          <div className="ImageComposition-result">
            <audio
              className="ImageComposition-video"
              src={outputUrl}
              autoPlay={false}
              controls
              controlsList="nodownload"
              // onPlay={() => setAutoPlay(true)}
            />

            <div
              className={cn('ImageComposition-result-placeholder', {
                loading: loadingTuuid || !outputUrl,
              })}
            >
              <Spinner />
              <p className="ImageComposition-result-placeholder-status">
                {t(`tip.${loadingTuuid ? 'uploadingPicture' : 'processingMusic'}`)}
              </p>
            </div>
          </div>
        </div>

        <div className="ImageComposition-sample">
          <ul className="ImageComposition-sample-list">
            {demos.map(({ isSample, url }, index) => (
              <li
                key={url}
                className={cn('ImageComposition-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(index)}
              >
                <img src={url} alt={`demo${index}`} />
                {isSample ? null : (
                  <span className="ImageDescription-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('ImageComposition-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="image/jpg" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ImageComposition
