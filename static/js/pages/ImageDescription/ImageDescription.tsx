import React, { useState, useEffect, useRef, useCallback, ChangeEventHandler } from 'react'
import axiosStatic, { CancelToken, CancelTokenSource } from 'axios'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import './ImageDescription.scss'
import { Button, Tabs, KeywordsResult, ArticlesResult } from 'common'
import { POLLING_INTERVAL, validateImageURL, ImageDescriptionResults, getJob, createJob, CDN_COS } from 'utils'

const bannerURL = `${CDN_COS}/assets/image/back11.jpg`
/** Types */
interface Demo {
  url: string
  keywordsJobId: string
  articleJobId: string
  isSample?: boolean
  keywords?: Record<string, string>
  article?: string[]
  downloadingKeywords?: boolean
  downloadingArticle?: boolean
  failed?: boolean
}

/** Variables */
const CancelTokenStatic = axiosStatic.CancelToken

const TabPane = Tabs.TabPane

const demos: Demo[] = [
  {
    url: 'https://img.zcool.cn/community/01d1675ec26bb6a8012072003e833d.jpg@1280w_1l_2o_100sh.jpg',
    keywords: ImageDescriptionResults[0].keywords,
    article: ImageDescriptionResults[0].article,
    isSample: true,
    keywordsJobId: '1',
    articleJobId: '1',
  },
  {
    url: 'https://img.zcool.cn/community/018d8759523259a8012193a3a5d5f7.JPG@1280w_1l_2o_100sh.jpg',
    keywords: ImageDescriptionResults[1].keywords,
    article: ImageDescriptionResults[1].article,
    isSample: true,
    keywordsJobId: '2',
    articleJobId: '2',
  },
  {
    url: 'https://p3.itc.cn/images01/20200518/31d0e3f8f5294d488571cb31c05c0567.jpeg',
    keywords: ImageDescriptionResults[2].keywords,
    article: ImageDescriptionResults[2].article,
    isSample: true,
    keywordsJobId: '3',
    articleJobId: '3',
  },
  {
    url: 'https://5b0988e595225.cdn.sohucs.com/images/20180110/c43e06014a084114ad334ad776d43851.jpeg',
    keywords: ImageDescriptionResults[3].keywords,
    article: ImageDescriptionResults[3].article,
    isSample: true,
    keywordsJobId: '4',
    articleJobId: '4',
  },
]

/** Functions */
async function requestKeywords(url: string, token?: CancelToken) {
  return await createJob(
    { url },
    {
      apparelImageKeywords: 2,
    },
    undefined,
    token,
  )
}

async function requestArticle(url: string, token?: CancelToken) {
  return await createJob(
    { url },
    {
      apparelImageArticle: 2,
    },
    undefined,
    token,
  )
}

const ImageDescription: React.FC = () => {
  const requestStackRef = useRef<CancelTokenSource[]>([])

  const { t } = useTranslation('imageDescription')

  const [mode, setMode] = useState<React.ReactText>('keywords')

  const [demosLength, setDemosLength] = useState(demos.length)
  const [currentDemo, setCurrentDemo] = useState(demos[0])
  const currentDemoRef = useRef(demos[0])

  const [textValue, setTextValue] = useState('')
  const [uploaderMSG, setUploaderMSG] = useState('')

  const [keywordsResult, setKeywordsResult] = useState<Record<string, string>>()
  const [articleResult, setArticleResult] = useState<string[]>()

  const [keywordsMSG, setKeywordsMSG] = useState<string | number>('')
  const [articleMSG, setArticleMSG] = useState<string | number>('')

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
      if (currentDemo.keywords) {
        /** Use cache */
        return setKeywordsResult(currentDemo.keywords)
      }
      if (currentDemoRef.current === currentDemo) {
        setKeywordsResult(undefined)
        setKeywordsMSG('')
      }
      if (currentDemo.downloadingKeywords) return

      const source = CancelTokenStatic.source()
      requestStack.push(source)

      currentDemo.downloadingKeywords = true
      try {
        const data = await getJob(currentDemo.keywordsJobId, source.token)
        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          currentDemo.keywords = job.outputs[0].smartContentResult?.apparelImageKeywords

          currentDemoRef.current === currentDemo && setKeywordsResult(currentDemo.keywords)
        } else if (job) {
          if (job.state === 4) {
            currentDemo.failed = true
            currentDemoRef.current === currentDemo && setKeywordsMSG('Job Failed')
          } else if ([1, 2].includes(job.state) && currentDemoRef.current === currentDemo) {
            setTimeout(request, POLLING_INTERVAL)
          }
        }
      } catch (e) {
        setTimeout(request, POLLING_INTERVAL)
        console.log(e)
      } finally {
        currentDemo.downloadingKeywords = false
        const sourceIndex = requestStack.indexOf(source)
        sourceIndex > -1 && requestStack.splice(sourceIndex, 1)
      }
    }

    setMode('keywords')

    request()
  }, [currentDemo])

  useEffect(() => {
    const requestStack = requestStackRef.current

    async function request() {
      if (currentDemo.article) {
        /** Use cache */
        return setArticleResult(currentDemo.article)
      }

      if (currentDemoRef.current === currentDemo) {
        setArticleResult(undefined)
        setArticleMSG('')
      }

      if (currentDemo.downloadingArticle) return

      const source = CancelTokenStatic.source()
      requestStack.push(source)

      currentDemo.downloadingArticle = true
      try {
        const data = await getJob(currentDemo.articleJobId, source.token)
        const job = data.getJobResponse?.job
        if (job && job.state === 3) {
          currentDemo.article = job.outputs[0].smartContentResult?.apparelImageArticle || []
          currentDemoRef.current === currentDemo && setArticleResult(currentDemo.article)
        } else if (job) {
          if (job.state === 4) {
            currentDemo.failed = true
            currentDemoRef.current === currentDemo && setArticleMSG('Job Failed')
          } else if ([1, 2].includes(job.state) && currentDemoRef.current === currentDemo) {
            setTimeout(request, POLLING_INTERVAL)
          }
        }
      } catch (e) {
        setTimeout(request, POLLING_INTERVAL)
        console.log(e)
      } finally {
        currentDemo.downloadingArticle = false
        const sourceIndex = requestStack.indexOf(source)
        sourceIndex > -1 && requestStack.splice(sourceIndex, 1)
      }
    }

    request()
  }, [currentDemo])

  const onChangeSample = useCallback(
    (index: number) => {
      const demo = demos[index]
      if (currentDemo !== demo) {
        setCurrentDemo(demo)
        currentDemoRef.current = demo
      }
    },
    [currentDemo],
  )

  const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    const value = e.target.value
    setTextValue(value)

    setUploaderMSG(value ? (validateImageURL(value) ? '' : 'invalidImageURL') : '')
  }, [])

  const onUpload = useCallback(async () => {
    const url = textValue.trim()

    if (!url || !validateImageURL(url)) return

    /* Find and switch to exists sample  */
    const duplicateDemo = demos.find((demo) => demo.url === url)
    if (duplicateDemo) {
      setCurrentDemo(duplicateDemo)
      currentDemoRef.current = duplicateDemo

      return
    }

    setTextValue('')

    const demo: Demo = { url, keywordsJobId: '', articleJobId: '' }
    demos.push(demo)

    setDemosLength(demosLength + 1)
    currentDemoRef.current = demo
    try {
      const keywordData = await requestKeywords(url)
      if (keywordData.createJobResponse?.job?.id) {
        demo.keywordsJobId = keywordData.createJobResponse.job.id
      }
      const articleData = await requestArticle(url)
      if (articleData.createJobResponse?.job?.id) {
        demo.articleJobId = articleData.createJobResponse.job.id
      }

      setCurrentDemo(demo)
    } catch (e) {
      console.log(e)
    }
  }, [demosLength, textValue])

  const onDelete = useCallback(
    (index: number, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.stopPropagation()

      const demo = demos[index]
      const replaceDemo = demos[index - 1]

      if (currentDemo === demo) {
        setCurrentDemo(replaceDemo)
        currentDemoRef.current = replaceDemo
      }

      demos.splice(index, 1)
      setDemosLength(demosLength - 1)
    },
    [currentDemo, demosLength],
  )

  return (
    <div className="ImageDescription">
      <div
        className="ImageDescription-banner"
        style={{
          backgroundImage: `url(${bannerURL})`,
        }}
      >
        <div className="ImageDescription-banner-content">
          <h2 className="ImageDescription-banner-title">{t`imageDescription`}</h2>
          <p className="ImageDescription-banner-description">{t`intro`}</p>
        </div>
      </div>

      <div className="ImageDescription-demo">
        <p>{`* ${t`supportsTip`}`}</p>

        <div className="ImageDescription-main">
          <div className="ImageDescription-preview">
            <img src={currentDemo.url} alt="Error URL" />
          </div>
          <div className="ImageDescription-result">
            <div className="tab-wrapper">
              <Tabs activeKey={mode} onChange={setMode}>
                <TabPane title={t`keywords`} paneKey="keywords">
                  <div className="tab-pane">
                    {keywordsMSG && !keywordsResult ? (
                      <p className="ImageDescription-result-message">{`${t`tip.keywordsFailed`} (${keywordsMSG})`}</p>
                    ) : (
                      <KeywordsResult keywords={keywordsResult} />
                    )}
                  </div>
                </TabPane>
                <TabPane title={t`articles`} paneKey="article">
                  <div className="tab-pane">
                    {articleMSG && !articleResult ? (
                      <p className="ImageDescription-result-message">{`${t`tip.articleFailed`} (${articleMSG})`}</p>
                    ) : (
                      <ArticlesResult article={articleResult} />
                    )}
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="ImageDescription-sample">
          <ul className="ImageDescription-sample-list">
            {demos.map((demo, index) => (
              <li
                key={demo.url}
                className={cn('ImageDescription-sample-item', { active: demo === currentDemo })}
                onClick={() => onChangeSample(index)}
              >
                <img src={demo.url} alt={`demo${index}`} />
                {demo.isSample ? null : (
                  <span className="ImageDescription-sample-item-delete" onClick={(e) => onDelete(index, e)}></span>
                )}
              </li>
            ))}
            <li
              className={cn('ImageDescription-sample-item', 'ImageDescription-inputer', {
                uploadable: !uploaderMSG,
              })}
            >
              <textarea
                value={textValue}
                onChange={onTextChange}
                placeholder={t`tip.inputURL`}
                style={{ resize: 'none' }}
              />
              <div className="ImageDescription-inputer-bottom">
                <div className="ImageDescription-inputer-bottom-wrapper">
                  <div className="ImageDescription-inputer-message">{t(`tip.${uploaderMSG}`)}</div>
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

export default ImageDescription
