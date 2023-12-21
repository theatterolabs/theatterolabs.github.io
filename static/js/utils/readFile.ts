export async function readFile(file: Blob) {
  return new Promise<FileReader | null>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const target = e.target
      if (target) {
        resolve(target)
      }

      reject(null)
    }

    reader.onerror = () => {
      reject(null)
    }

    reader.readAsDataURL(file)
  })
}
