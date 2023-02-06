import request from '@/utils/request'

// 登陆
export const api_login = (postdata) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: postdata
  })
}

// 注册
export const api_signup = (postdata) => {
  return request({
    url: '/user/signup',
    method: 'POST',
    data: postdata
  })
}

// 用户是否存在
export const api_isExist = (postdata) => {
  return request({
    url: '/user/isExist',
    method: 'POST',
    data: postdata
  })
}

export const api_profile = () => {
  return request({
    url: '/user/profile'
  })
}
