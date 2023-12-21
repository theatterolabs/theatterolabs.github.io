import axios from 'axios'
import { HmacSHA1, enc } from 'crypto-js'

const instance = () => {
  const dateTime = new Date().toUTCString()
  const SecretId = process.env.REACT_APP_SC_SECRETID
  const SecretKey = process.env.REACT_APP_SC_SECRETKEY
  const source = 'smart_content_frontend'
  const auth = `hmac id="${SecretId}", algorithm="hmac-sha1", headers="x-date source", signature="`
  const signStr = `x-date: ${dateTime}\nsource: ${source}`
  const sign = auth + enc.Base64.stringify(HmacSHA1(signStr, SecretKey)) + '"'
  return axios.create({
    headers: {
      Source: source,
      'X-Date': dateTime,
      Authorization: sign,
    },
    withCredentials: true,
  })
}
export default instance
