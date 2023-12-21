import COS, { AuthResData } from 'cos-js-sdk-v5'
import { AxiosResponse } from 'axios'

import { axios, TMP_KEY_URL, BACK_ENV } from 'utils'

export const cos = new COS({
  Domain:"smartcontent-source-1257411467.cos.accelerate.myqcloud.com",
  getAuthorization: async (options, callback) => {
    const response = await axios().post<
      {
        env: 'beta' | 'gamma' | 'product'
      },
      AxiosResponse<AuthResData>
    >(TMP_KEY_URL, {
      env: BACK_ENV,
    })

    const data = response.data
    const credentials = data && data.credentials
    if (!data || !credentials) return console.error('COS credentials invalid')

    callback({
      TmpSecretId: credentials.tmpSecretId,
      TmpSecretKey: credentials.tmpSecretKey,
      XCosSecurityToken: credentials.sessionToken,
      StartTime: data.startTime, // timestamp
      ExpiredTime: data.expiredTime, // timestamp
    })
  },
})

export async function putObject(file: File, key: string) {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: 'smartcontent-source-1257411467',
        Region: 'ap-beijing',
        Key: key,
        Body: file,
      },
      function (err) {
        if (err) {
          reject(new Error(err.message))
        } else {
          resolve()
        }
      },
    )
  })
}

export async function getTempUrl(key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cos.getObjectUrl(
      {
        Bucket: 'smartcontent-source-1257411467',
        Region: 'ap-beijing',
        Key: key,
        Sign: true,
      },
      function (err, data) {
        if (err || !data) {
          reject(new Error(err?.message || 'Get Cos URL Error'))
        } else {
          resolve(data.Url)
        }
      },
    )
  })
}

export async function putObjectSlice(file: File, key: string) {
  return new Promise((resolve, reject) => {
    cos.sliceUploadFile(
      {
        Bucket: 'smartcontent-source-1257411467',
        Region: 'ap-beijing',
        Key: key,
        Body: file,
      },
      function (err) {
        if (err) {
          reject(new Error(err.message))
        } else {
          resolve()
        }
      },
    )
  })
}
