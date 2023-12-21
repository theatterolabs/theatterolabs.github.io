import React, { useState, useRef, useEffect, useCallback } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { Uploader, Spinner } from 'common'
import axiosStatic, { CancelTokenSource } from 'axios'

import { readVideo, POLLING_INTERVAL, BACK_ENV, putObjectSlice, getTempUrl, getJob, createJob, CDN_COS } from 'utils'

import './GVA.scss'

const CancelTokenStatic = axiosStatic.CancelToken
const bannerURL = `${CDN_COS}/assets/image/back15.jpg`

type Demo = {
  id: number
  original: string
  jobId: string
  source?: CancelTokenSource
  isSample?: boolean
  result: string[]
  uploading?: boolean
}

const COS_URL_PREFIX = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/gva/'
const demo: Demo[] = [
  {
    id: 0,
    jobId: '1',
    original: 'gva_pubg1.mp4',
    result: ['gva_pubg1_result1.mp4', 'gva_pubg1_result2.mp4', 'gva_pubg1_result3.mp4', 'gva_pubg1_result4.mp4'],
  },
  {
    id: 1,
    jobId: '2',
    original: 'gva_pubg2.mp4',
    result: ['gva_pubg2_result1.mp4', 'gva_pubg2_result2.mp4', 'gva_pubg2_result3.mp4', 'gva_pubg2_result4.mp4'],
  },
]

const COS_URL_PREFIX2 = 'https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/gva'
const demo2: Demo[] = [
  {
    id: 0,
    original: `${COS_URL_PREFIX2}/gva_demo1.mp4`,
    jobId: '1',
    isSample: true,
    result: [`${COS_URL_PREFIX2}/gva_demo1_result1.mp4`, `${COS_URL_PREFIX2}/gva_demo1_result2.mp4`, `${COS_URL_PREFIX2}/gva_demo1_result3.mp4`, `${COS_URL_PREFIX2}/gva_demo1_result4.mp4`],
  },
  {
    id: 1,
    original: `${COS_URL_PREFIX2}/gva_demo2.mp4`,
    jobId: '2',
    isSample: true,
    result: [`${COS_URL_PREFIX2}/gva_demo2_result1.mp4`, `${COS_URL_PREFIX2}/gva_demo2_result2.mp4`, `${COS_URL_PREFIX2}/gva_demo2_result3.mp4`, `${COS_URL_PREFIX2}/gva_demo2_result4.mp4`],
  }
]

/** Functions */
async function uploadVideo(file: File) {
  const cosKey = `${BACK_ENV}/video/gva/${file.size}-${file.name}`

  await putObjectSlice(file, cosKey)
  const url = await getTempUrl(cosKey)

  return await createJob(
    { url },
    {
      outputPrefix: `${Math.random().toString(36).slice(-6)}`,
      "gameAnalysis": {
        "analysisSwitch": 2
      }
    },
    `/assets/result/vga`
  )
}

const GVA: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const requestStackRef = useRef<CancelTokenSource[]>([])
  const [demoIndex, setDemoIndex] = useState(0)
  const [demoIndex2, setDemoIndex2] = useState(0)

  const [currentTuuid, setCurrentTuuid] = useState<string>(demo2[0].jobId)
  const [result, setResult] = useState<string[]>()
  const [loadingTuuid, setLoadingTuuid] = useState<boolean>(false)
  const tuuidRef = useRef(demo2[0].jobId)

  const [videoMSG, setVideoMSG] = useState<string | number>('')

  const [demosLength, setDemosLength] = useState(demo2.length)

  const [isShowPagination, setIsShowPagination] = useState(false)

  const [curPageIndex, setCurPageIndex] = useState(1)
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(4)
  const [totalPages,setTotalPages] = useState(0)

  const { t } = useTranslation('gva')

  const updatePagination = useCallback((demo: Demo, index) => {
    if (demo.result.length > 4) {
      setIsShowPagination(true)
    } else {
      setIsShowPagination(false)
    }

    const startIndex = (index - 1) * 4;
    const endIndex = startIndex + 4;
    const totalPages = Math.ceil(demo.result.length / 4);

    setStartIndex(startIndex);
    setEndIndex(endIndex);
    setCurPageIndex(index);
    setTotalPages(totalPages)
  }, [])

  useEffect(() => {
    updatePagination(demo2[0], 1);

    const requestStack = requestStackRef.current

    return () => {
      requestStack.forEach((source) => {
        source.cancel('Exit page')
      })
    }
  }, [updatePagination])

  useEffect(() => {

    const requestStack = requestStackRef.current

    async function request() {

      const demo = demo2.find((demo) => demo.jobId === currentTuuid)

      if (!demo) return
      if (demo.result && demo.result.length > 0) {
        return setResult(demo.result)
      }

      if (tuuidRef.current === currentTuuid) {
        setResult(undefined)
        setVideoMSG('')
      }
      const source = CancelTokenStatic.source()
      requestStack.push(source)

      try {
        const data = await getJob(currentTuuid, source.token)
        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          if (job.outputs[0].smartContentResult?.gameAnalysis?.highlights) {
            job.outputs[0].smartContentResult?.gameAnalysis?.highlights.forEach((item) => {
              demo.result.push('https://smartcontent-source-1257411467.cos.accelerate.myqcloud.com/assets/result/vga/' + item)
            });

            tuuidRef.current === currentTuuid && setResult(demo.result);

            updatePagination(demo,1);
          } else {
            demo.result = [];
            tuuidRef.current === currentTuuid && setResult([])
          }
        } else {
          if (data.errorResponse) {
            tuuidRef.current === currentTuuid && setVideoMSG(data.errorResponse.message)
          } else if (job) {
            if (job.state === 4) {
              tuuidRef.current === currentTuuid && setVideoMSG('Job Failed')
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
  }, [currentTuuid,updatePagination])


  const prevPage = useCallback((demo: Demo) => {
    if (curPageIndex - 1 >= 1) {
      updatePagination(demo, curPageIndex - 1);
    }

  }, [curPageIndex,updatePagination])

  const nextPage = useCallback((demo: Demo) => {
    if (curPageIndex + 1 <= totalPages) {
      updatePagination(demo, curPageIndex + 1);
    }

  }, [curPageIndex,totalPages,updatePagination])

  const switchDemo = useCallback((demo: Demo) => {
    setCurPageIndex(1)
    updatePagination(demo, 1);

    setCurrentTuuid(demo.jobId)
    tuuidRef.current = demo.jobId

    setDemoIndex2(demo.id)

    setLoadingTuuid(!!demo.uploading)
  }, [updatePagination])

  const onChangeSample = useCallback(
    (demo: Demo) => {
      if (demo && demoIndex2 !== demo.id) {
        switchDemo(demo)
      }
    },
    [demoIndex2, switchDemo],
  )

  const onUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || !files.length) return
      const file = files[0]
      const maxSize = 2 * 1024 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(t`tip.videoSizeLimitDialog`);
        return false;
      }

      const target = await readVideo(file)

      if (target) {
        const arrayBuffer = target.result as string
        let original = URL.createObjectURL(new Blob([arrayBuffer]))

        const duplicateDemo = demo2.find((demo) => demo.original === original)
        if (duplicateDemo) {
          switchDemo(duplicateDemo)

          return
        }
        const demo: Demo = {
          id: demo2[demo2.length - 1].id + 1,
          original,
          jobId: '',
          result: []
        }

        demo2.push(demo)

        setDemoIndex2(demo.id)

        setCurrentTuuid('')
        setResult(undefined)

        /** Upload video */
        setLoadingTuuid(true)
        demo.uploading = true
        try {
          const data = await uploadVideo(file)
          if (data.createJobResponse?.job?.id) {
            demo.jobId = data.createJobResponse.job.id
            setCurrentTuuid(data.createJobResponse.job.id)

            tuuidRef.current = demo.jobId

          } else {
            setVideoMSG(data.errorResponse?.message || 'Upload Failed')
          }

          setLoadingTuuid(false)
          demo.uploading = false
        } catch (e) {
          console.log(e)
        }
      }
    },
    [switchDemo,t],
  )

  const onDelete = useCallback(
    (index: number, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation()

      const demo = demo2[index]

      if (demo.uploading && demo.source) {
        demo.source.cancel('Cancel Upload')
      }

      if (demoIndex2 === demo.id) switchDemo(demo2[index - 1])

      demo2.splice(index, 1)
      setDemosLength(demosLength - 1)
    },
    [demoIndex2, switchDemo, demosLength],
  )

  return (
    <div className="GVA">
      <div
        className="GVA-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="GVA-banner-content">
          <h2 className="GVA-banner-title">{t`gva`}</h2>
          <p className="GVA-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="GVA-demo">
        <p>{`* ${t`supportsTip`}`}</p>
        <div className="GVA-game">
          {t`lol`}
        </div>

        <div className="GVA-word">
          <div>{t`originalVideo`}</div>
          <div>{t`highlights`}</div>
        </div>
        <div className="GVA-main">
          <div className="GVA-original">
            <video
              src={demo2[demoIndex2].original}
              controls
              controlsList="nodownload"
              ref={videoRef}
            ></video>
          </div>
          <div
            className={cn('GVA-wrap', {
              loading: loadingTuuid || (!result && !videoMSG),
            })}
          >
            {videoMSG && !result ? (
              <div className="GVA-result-message">{`${t`tip.processedFailed`} ${videoMSG}`}</div>
            ) : (result && result.length ?
              (<div className="GVA-result">
                {isShowPagination &&
                  (
                    <div className='GVA-pagination'>
                      <span className={cn('GVA-pagination-prev', { grey: curPageIndex === 1 })}  onClick={() => prevPage(demo2[demoIndex2])}>上一页</span>
                      <span className={cn('GVA-pagination-next', { grey: curPageIndex === totalPages })} onClick={() => nextPage(demo2[demoIndex2])}>下一页</span>
                      <span className="GVA-pagination-nums">{curPageIndex}/{totalPages}</span>
                    </div>
                  )
                }
                {demo2[demoIndex2].result.map((file, i) => (
                  i >= startIndex && i < endIndex ? (
                    <div key={i}>
                      <video src={file} controls controlsList="nodownload" ref={videoRef}></video>
                    </div>
                  ) : ''
                ))}
              </div>) :
              <div className="GVA-result-message">{`${t`tip.emptyResult`}`}</div>
            )}

            <div className="GVA-result-cover">
              <Spinner size={'20px'} />
              <p className="GVA-result-cover-status">
                {t(`tip.${loadingTuuid ? 'uploadingVideo' : 'processingVideo'}`)}
                {loadingTuuid}
              </p>
            </div>
          </div>
        </div>

        <div className="GVA-sample">
          <ul className="GVA-sample-list">
            {demo2.map((demo, index) => (
              <li
                key={demo.original}
                className={cn('GVA-sample-item', { active: demo.id === demoIndex2 })}
                onClick={() => onChangeSample(demo)}
              >
                {`${t('demo')}${demo.id + 1}`}
                {demo.isSample ? null : (
                  <span className="GVA-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li className={cn('GVA-sample-item', 'uploader')}>
              <Uploader onUpload={onUpload} accept="video/*" message={t`tip.videoSizeLimit`}/>
            </li>
          </ul>
        </div>

        <div className="GVA-game">
          {t`cod`}
        </div>
        <div className="GVA-word">
          <div>{t`originalVideo`}</div>
          <div>{t`highlights`}</div>
        </div>
        <div className="GVA-main">
          <div className="GVA-original">
            <video
              src={COS_URL_PREFIX + demo[demoIndex].original}
              controls
              controlsList="nodownload"
              ref={videoRef}
            ></video>
          </div>
          <div>
            <div className="GVA-result">
              {demo[demoIndex].result.map((file, i) => (
                <div key={i}>
                  <video src={COS_URL_PREFIX + file} controls controlsList="nodownload" ref={videoRef}></video>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="GVA-sample">
          <ul className="GVA-sample-list">
            {demo.map((demo, index) => (
              <li
                key={demo.original}
                className={cn('GVA-sample-item', { active: demo.id === demoIndex })}
                onClick={() => setDemoIndex(demo.id)}
              >
                {`${t('demo')}${demo.id + 1}`}

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GVA
