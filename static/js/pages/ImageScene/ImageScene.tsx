import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import axiosStatic, { CancelTokenSource } from 'axios'
import { useTranslation } from 'react-i18next'

import './ImageScene.scss'
import { Uploader, Spinner } from 'common'
import { readFile, POLLING_INTERVAL, BACK_ENV, putObjectSlice, getTempUrl, getJob, createJob, CDN_COS } from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back16.jpg`
/** Types */
type Demo = {
  url: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result?: string
  uploading?: boolean
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken
const COS_PREFIX = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/imageRecognition'

const demos: Demo[] = [
  {
    url: `${COS_PREFIX}/demo1.jpg`,
    jobId: '1',
    result: `识别结果:coast_beach
    
    概率top5:
    - coast_beach: 0.5452
    - rivers_and_lakes: 0.1129
    - ocean: 0.0905
    - wild: 0.0482
    - sports_ground_outdoor: 0.0263`,
    isSample: true
  },
  {
    url: `${COS_PREFIX}/demo2.jpg`,
    jobId: '2',
    result: `识别结果:bar

    概率top5:
    - bar: 0.5638
    - shop: 0.23
    - entertainment_venues: 0.0682
    - restaurant: 0.0442
    - hospital: 0.0314
    `,
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/demo3.jpg`,
    jobId: '3',
    result: `识别结果:mountain

    概率top5:
    - mountain: 0.7955
    - ice_and_snow: 0.1158
    - ski_resort: 0.0425
    - wild: 0.016
    - grass: 0.0133
    `,
    isSample: true,
  },
  {
    url: `${COS_PREFIX}/demo4.jpg`,
    jobId: '4',
    result: `识别结果:village

    概率top5:
    - village: 0.8978
    - castle: 0.0436
    - religious_buildings: 0.0204
    - building: 0.0131
    - rivers_and_lakes: 0.0032
    `,
    isSample: true,
  },
]

/** Functions */
async function uploadimage(file: File) {
  const cosKey = `${BACK_ENV}/image/scene/${file.size}-${file.name}`
  
  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      imageAnalysis: {
        type: 3,
      },
    },
    `${BACK_ENV}/result/imageScene`,
  )
}

const ImageScene: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const imagePreviewRef = useRef<HTMLImageElement>(null)
  const imageResultRef = useRef<HTMLImageElement>(null)

  const { t,i18n } = useTranslation('imageScene')
  const currentLanguage = i18n.language;

  const [demosLength, setDemosLength] = useState(demos.length)
  const [previewURL, setPreviewURL] = useState<string>(demos[0].url)
  const previewURLRef = useRef(demos[0].url)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demos[0].jobId)
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demos[0].jobId)

  const [result, setResult] = useState<string>()

  const [imageMSG, setImageMSG] = useState<string | number>('')

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
        if(currentLanguage === "en"){
          return setResult(demo.result?.replace('识别结果:','Prediction:').replace('概率top5:','Top5 probabilities:'))
        }else{
          return setResult(demo.result?.replace('Prediction:','识别结果:').replace('Top5 probabilities:','概率top5:'))
        }
      }

      if (tuuidRef.current === currentTuuid) {
        setResult(undefined)
        setImageMSG('')
      }
      const source = CancelTokenStatic.source()
      requestStack.push(source)

      try {
        const data = await getJob(currentTuuid, source.token)
        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          let result = '';
          result += (currentLanguage === "en" ? 'Prediction:' : '识别结果:')+ job.outputs[0].smartContentResult?.imageAnalysis?.prediction+"\n\n"

          result += (currentLanguage === "en" ? 'Top5 probabilities:' : '概率top5:') + "\n"

          job.outputs[0].smartContentResult?.imageAnalysis?.probabilities?.forEach((item)=>{
            result += `- ${item.category}:${item.probability}\n`
          })

          demo.result = result
          tuuidRef.current === currentTuuid && setResult(demo.result)
          

        } else {
          if (data.errorResponse) {
            tuuidRef.current === currentTuuid && setImageMSG(data.errorResponse.message)
          } else if (job) {
            if (job.state === 4) {
              tuuidRef.current === currentTuuid && setImageMSG('Job Failed')
            } else if ([1, 2].includes(job.state) && tuuidRef.current === currentTuuid) {
              setTimeout(request, POLLING_INTERVAL)
            }
          }
        }
      } catch (e) {
        setTimeout(request, POLLING_INTERVAL)
        console.log(e)
      } finally {
        /** Remove the source when request is finished */
        const sourceIndex = requestStack.indexOf(source)
        sourceIndex > -1 && requestStack.splice(sourceIndex, 1)
      }
    }

    currentTuuid && request()
  }, [currentTuuid,currentLanguage])

  useEffect(() => {
    if(result){
      if(currentLanguage === "en"){
        setResult(result?.replace('识别结果:','Prediction:').replace('概率top5:','Top5 probabilities:'))
      }else if(currentLanguage === "zh"){
        setResult(result?.replace('Prediction:','识别结果:').replace('Top5 probabilities:','概率top5:'))
      }
    }
    
  },[currentLanguage,result])

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

        /** Upload image */
        setLoadingTuuid(true)
        demo.uploading = true
        try {
          const data = await uploadimage(file)
          if (data.createJobResponse?.job?.id) {
            demo.jobId = data.createJobResponse.job.id
            previewURLRef.current === demo.url && setCurrentTuuid(data.createJobResponse.job.id)
            
            

            tuuidRef.current = demo.jobId
          } else {
            setImageMSG(data.errorResponse?.message || 'Upload Failed')
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
    <div className="ImageScene">
      <div
        className="ImageScene-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="ImageScene-banner-content">
          <h2 className="ImageScene-banner-title">{t`imageScene`}</h2>
          <p className="ImageScene-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="ImageScene-demo">
        <div className="ImageScene-main">
          <div className="ImageScene-preview">
            <h2 className="ImageScene-main-title">{t`inputImage`}</h2>
            <div className="ImageScene-preview-wrap">
              <img src={previewURL} ref={imagePreviewRef} alt=""></img>
            </div>
          </div>
          <div className="ImageScene-result">
            <h2 className="ImageScene-main-title">{t`recognitionResult`}</h2>
            <div
              className={cn('ImageScene-result-wrap', {
                loading: loadingTuuid || (!result && !imageMSG),
              })}
            >
              {imageMSG && !result ? (
                <div className="ImageScene-result-message">{`${t`tip.processedFailed`} (${imageMSG})`}</div>
              ) : (
                <div className="ImageScene-preview-result" ref={imageResultRef}>{result}</div>
              )}
              <div className="ImageScene-result-cover">
                <Spinner />
                <p className="ImageScene-result-cover-status">
                  {t(`tip.${loadingTuuid ? 'uploadingPicture' : 'processingPicture'}`)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="ImageScene-sample">
          <ul className="ImageScene-sample-list">
            {demos.map(({ isSample, url }, index) => (
              <li
                key={url}
                className={cn('ImageScene-sample-item', { active: url === previewURL })}
                onClick={() => onChangeSample(demos[index])}
              >
                <img src={url} alt=""></img>
                {isSample ? null : (
                  <span className="ImageScene-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('ImageScene-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="image/jpg" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ImageScene
