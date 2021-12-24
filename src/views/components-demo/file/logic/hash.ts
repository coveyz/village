import { reactive, toRefs } from 'vue'
import sparkMD5 from 'spark-md5'
import { fileChunksState } from './chunks'


export const hashWork = () => {
  const state = reactive({
    timeHashProgress: 0,
    hashProgress: 0
  })
  const calculHashWorkOfTime = (chunks: fileChunksState[]): Promise<string> => {
    return new Promise(resolve => {
      const spark = new sparkMD5.ArrayBuffer()
      let count = 0

      const appendToSpark = (file: Blob) => {
        return new Promise<void>(resolve => {
          const reader = new FileReader()
          reader.readAsArrayBuffer(file)
          reader.onload = e => {
            if (e.target && e.target.result) {
              spark.append(e.target.result as ArrayBuffer)
              resolve()
            }
          }
        })
      }

      const workLoop = async (deadline: any) => {
        //* timeRemaining 获取当前帧的声誉时间
        while (count < chunks.length && deadline.timeRemaining() > 1) {
          await appendToSpark(chunks[count].file)
          count += 1

          if (count < chunks.length) {
            state.timeHashProgress = Number(((100 * count) / chunks.length).toFixed(2))
          } else {
            console.log('time=>', spark.end())
            state.timeHashProgress = 100
            resolve(spark.end())
          }

        }
        (window as any).requestIdleCallback(workLoop)
      }
      (window as any).requestIdleCallback(workLoop)
    })
  }

  //* 利用布隆过滤器
  const calculHashSample = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const spark = new sparkMD5.ArrayBuffer()
      const reader = new FileReader()

      const size = file.size
      const offset = 2 * 1024 * 1024

      const chunks = [file.slice(0, offset)]
      let cur = offset

      while (cur < size) {
        //* 最后一块
        if (cur + offset >= size) {
          chunks.push(file.slice(cur, cur + offset))
        } else {
          const middle = cur + offset / 2
          const end = cur + offset

          chunks.push(file.slice(cur, cur + 2))
          chunks.push(file.slice(middle, middle + 2))
          chunks.push(file.slice(end - 2, end))
        }

        cur += offset
      }

      reader.readAsArrayBuffer(new Blob(chunks))
      reader.onload = e => {
        if (e.target && e.target.result) {
          spark.append(e.target.result as ArrayBuffer)
          state.hashProgress = 100
          resolve(spark.end())
        }

      }

    })
  }


  return { ...toRefs(state), calculHashWorkOfTime, calculHashSample }
}