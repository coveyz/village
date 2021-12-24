import { checkFile, uploadFile, mergeFile } from '@/api/components/file'
import { successMsg } from '@/utils/box'
import { fileChunksState } from './chunks'


type checkFileState = {
  hash: string,
  exp: string
}

type uploadItemState = {
  form: FormData,
  index: number,
  error: number
}


export const upload = () => {

  /**
   ** 校验文件 - 判断当前文件是否传输
   */
  const checkoption = async (checkOptions: checkFileState) => {
    const result = await checkFile(checkOptions)
    const { uploadList, uploaded } = result.data.data

    return { uploadList, uploaded }
  }
  /**
   ** 整合 请求文件碎片
   */
  const integrationChunks = (uploadList: string[], chunks: fileChunksState[]): uploadItemState[] => {
    return chunks.filter(chunk => !uploadList.includes(chunk.name)).map(chunk => {
      const fd = new FormData()
      fd.append('hash', chunk.hash)
      fd.append('name', chunk.name)
      fd.append('file', chunk.file)
      return { form: fd, index: chunk.index, error: 0 }
    })
  }

  /**
   ** 发送文件请求 -> 
   ** 控制并发数 和 错误控制
   */
  const sendRequest = async (queue: uploadItemState[], chunks: fileChunksState[], progressCallback: any, limit = 4) => {
    return new Promise<void>((resolve, reject) => {
      const len = chunks.length
      let counter = 0, isStop = false
      //* 请求 方法
      const start = async () => {
        if (isStop) return
        const task = queue.shift()

        if (task) {
          const { index } = task
          uploadFile(task, progressCallback).then(() => {
            if (counter === len - 1) {
              resolve()
            } else {
              counter += 1
              start()
            }
          }).catch(() => {
            chunks[index]['progress'] = -1
            if (task.error < 3) {
              task.error += 1
              queue.unshift(task)
            } else {
              isStop = true
              reject()
            }
          })
        }
      }
      //* 控制 并发
      while (limit > 0) {
        setTimeout(() => {
          start()
        }, Math.random() * 2000);
        limit -= 1
      }
    })
  }

  /**
   ** 发送合并文件 请求
   */
  const mergeFileRequest = (file: File, hash: string) => {
    const CHUNK_SIZE = 10 * 1024 * 1024
    const req = {
      ext: file.name.split('.').pop() || '',
      hash: hash,
      size: CHUNK_SIZE
    }

    mergeFile(req).then(res => {
      console.log('上传文件成功');
      successMsg('上传文件成功')
    })
  }

  return { checkoption, integrationChunks, sendRequest, mergeFileRequest }
}