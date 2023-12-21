//读取大视频需用readAsArrayBuffer的API
export async function readVideo(file: Blob) {
  return new Promise<FileReader | null>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const target = e.target
      if (target) {
        resolve(target)
      }

      reject(null)
    }

    reader.onerror = (e) => {
      console.log(e);
      reject(null)
    }
    reader.readAsArrayBuffer(file);
  })
}
