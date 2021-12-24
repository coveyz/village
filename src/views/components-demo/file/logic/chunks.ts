
export type fileChunksState = {
  index: number
  file: Blob,
  hash: string,
  name: string,
  progress: number
}

export const chunks = () => {
  const CHUNK_SIZE = 10 * 1024 * 1024
  /**
   ** 创建文件切片
   */
  const createFileChunks = (file: File, fileHash: string, size = CHUNK_SIZE) => {
    const chunks: fileChunksState[] = []

    let cur = 0, index = 0

    while (cur < file.size) {
      const fragment = {
        index: index,
        file: file.slice(cur, cur + size),
        hash: fileHash,
        name: `${fileHash}-${index}`,
        progress: 0
      }

      chunks.push(fragment)
      cur += size
      index += 1
    }

    return chunks
  }

  return { createFileChunks }

}

