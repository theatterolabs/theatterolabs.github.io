import axios from './axios'
import { AxiosResponse, CancelToken } from 'axios'

export type WzryHighlight = {
  begin: string
  end: string
  tag: string[]
  caption: string
  barrage: string[]
}

export type LyricsResponse = {
  head: string
  pattern: string
  lyricResult?: string
  rapResult?: string
}

export type RemoveWatermarkResponse = {
  watermarkInfos?: 
    {
      xCoordinate: string,
      yCoordinate: string,
      width: string,
      height: string,
      content: string,
    }[],
  fileName: string,
}

export type AudioTaggerResponse = 
  {
    tagType: string,
    tag: string,
    probility: string,
  }[]

export type Instrument =
  | 'original'
  | 'Harp'
  | 'MusicBox'
  | 'Luan'
  | 'Trombone'
  | 'AcousticGuitar'
  | 'Clarine'
  | 'Cello'
  | 'Sax'
  | 'Flute'
  | 'Pipa'
  | 'GuZheng'
  | 'Marimba'
  | 'Dulcimer'
  | 'Accordion'

export type Style = 'original' | 'chinese' | 'pop' | 'rnb' | 'rock' | 'dj' | 'futurebass' | 'opera' | 'ballad' | 'light'

export type Seperate = 'original' | 'vocals' | 'drums' | 'bass' | 'accompaniment'

export type VideoResultObject = {
  keywords: Record<string, string | undefined>
  article: string[]
}

type CreateJobResponse = {
  errorResponse?: {
    message: string
  }
  createJobResponse?: {
    job: {
      id: string
    }
  }
}

type GetJobResponse = {
  errorResponse?: {
    message: string
  }
  getJobResponse?: {
    job: {
      id: string
      state: number
      outputs: {
        smartContentResult?: {
          
          videoAnalysis?:{
            detectionFileName?:string
          }
          imageAnalysis?:{
            prediction?:string
            probabilities?:[
              {
                category?:string
                probability?:string
              }
            ],
            detectionFileName?:string
            visualizationFileName?:string
          }
          singingConversion?:{
            songName?:string
          }
          gameAnalysis?:{
            highlights:string[]
          }
          voiceCloning?:{
            voiceName?:string
            modelName?:string
          }
          apparelImageKeywords?: { [k: string]: string }
          apparelImageArticle?: string[]
          musicMV?: string[]
          videoCrop?: string
          videoBGM?: [{outputName: string}]
          smartCover?: [
            { fileName: string }, 
            { fileName: string },
            { fileName: string }]
          ocr?: {
            text: string,
            confidence: string,
            location: {
              left: string,
              right: string,
              top: string,
              bottom: string,
            }
          }[]
          removeWatermark?: RemoveWatermarkResponse
          vlog?: {
            noBgmOutput: string,
            bgmOutputs: string[],
          }
          visualCaption?: {
            chinese: string
            english: string
          }
          gameCaption?: WzryHighlight[]
          lyricsGenerator?: LyricsResponse[]
          musicInstrumentTransform?: {
            fileName: string
            instrument: number
          }[]
          musicStyleTransform?: {
            fileName: string
            style: number
          }[]
          musicSeperate?: {
            fileName: string
            tone: number
          }[]
          musicBeat?: {
            mergeFileName: string
          }
          musicHighlight?: {start: string, end: string, score: string}[] 
          apparelVideoDescription?: VideoResultObject
          audioTagger?: AudioTaggerResponse
          imageEnhancement?: string,
          imageBgmGeneration?: {
            songName: string
          }[]
          videoBgmGeneration?: {
            videoName: string
          }[]
        }
      }[]
    }
  }
}

type TMPInput = {
  url?: string
  sourceData?: string
}

const TMP_GATEWAY = 'https://service-6ube6p9n-1257411467.bj.apigw.tencentcs.com/release/tmp/job'

const TMP_ENV = undefined

const TMP_CONTENT_ID = TMP_ENV ? 'bb037d1f-e73a-4310-88fc-898f1c241c6a' : '8c39e8b5-aa28-4d5b-8904-79fd1a8e256f'

export async function createJob(input: TMPInput, descriptor: any, destination?: string, token?: CancelToken) {
  const response = await axios().post<any, AxiosResponse<CreateJobResponse>>(
    TMP_GATEWAY,
    {
      env: TMP_ENV,
      action: 'CreateJob',
      body: {
        customId: localStorage.getItem('userId'),
        inputs: [input],
        outputs: [
          {
            contentId: destination && TMP_CONTENT_ID,
            destination,
            inputSelectors: [0],
            smartContentDescriptor: descriptor,
          },
        ],
      },
      jwt: localStorage.getItem('jwt')
    },
    {
      cancelToken: token,
      headers: { 'Content-Type': 'application/json' },
    },
  )

  return response.data
}

export async function getJob(id: string, token?: CancelToken) {
  const response = await axios().post<any, AxiosResponse<GetJobResponse>>(
    TMP_GATEWAY,
    {
      env: TMP_ENV,
      action: 'GetJob',
      body: { id },
      jwt: localStorage.getItem('jwt')
    },
    {
      cancelToken: token,
      headers: { 'Content-Type': 'application/json' },
    },
  )
  return response.data
}

export async function getListModels(start:number, end:number, token?: CancelToken) {
  const response = await axios().post<any, AxiosResponse<GetJobResponse>>(
    'https://service-6ube6p9n-1257411467.bj.apigw.tencentcs.com/release/tmp/music_model',
    {
      env: TMP_ENV,
      action: 'ListModels',
      body: {
        "offset": start,
      	"limit": end   // 最大100
      },
      jwt: localStorage.getItem('jwt')
    },
    {
      cancelToken: token,
      headers: { 'Content-Type': 'application/json' },
    },
  )
  return response.data
}