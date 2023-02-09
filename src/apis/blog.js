import request from '@/utils/request'

// 创建微博
export const api_createBlog = (postdata) => {
  return request({
    url: '/blog/create',
    method: 'POST',
    data: postdata
  })
}

export const api_queryBlog = (type, postdata) => {
  return request({
    url: '/blog/query',
    method: 'POST',
    headers: {
      'x-query-type': type
    },
    data: postdata
  })
}
