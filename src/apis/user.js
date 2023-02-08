import request from '@/utils/request'

// 登陆
export const api_login = (postdata) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: postdata
  })
}

// 退出登陆
export const api_logout = () => {
  return request({
    url: '/user/logout',
    method: 'POST'
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

// 用户信息
export const api_profile = () => {
  return request({
    url: '/user/profile'
  })
}

// 更新用户信息
export const api_updateProfile = (postdata) => {
  return request({
    url: '/user/updateProfile',
    method: 'PATCH',
    data: postdata
  })
}

// 重置用户密码
export const api_updatePassword = (postdata) => {
  return request({
    url: '/user/updatePassword',
    method: 'PATCH',
    data: postdata
  })
}
