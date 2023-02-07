import request from '@/utils/request'

// 文件上传
export const api_uploadFile = (postdata) => {
  return request({
    url: '/utils/upload',
    method: 'POST',
    data: postdata
  })
}
