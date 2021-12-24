import http from '@/utils/request'
import { AxiosPromise } from 'axios'
import { CheckFileData, CheckFileResultState } from './type'

export interface RootObject<T> {
  code: number
  message: string
  data: T
}


export const checkFile = (requestData: CheckFileData): AxiosPromise<RootObject<CheckFileResultState>> => {
  return http({
    method: 'POST',
    data: requestData,
    url: '/api/checkfile'
  })
}

export const uploadFile = ({ form, index }: { form: FormData, index: number }, callback: any) => {
  return http({
    method: 'POST',
    data: form,
    url: '/api/uploadfile',
    onUploadProgress: (progress) => {
      const progressNumber = Number(((progress.loaded / progress.total) * 100).toFixed(2));
      callback(progressNumber, index);
    }
  })
}

export const mergeFile = (requestData: any) => {
  return http({
    method: 'POST',
    data: requestData,
    url: `/api/mergefile`
  })
}