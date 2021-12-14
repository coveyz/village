import http from '@/utils/request'

type SendEmailData = {
  email: string
}

export const sendEmail = (requestData: SendEmailData) => {
  return http({
    method: 'GET',
    params: requestData,
    url: '/api/sendcode',
  })
}