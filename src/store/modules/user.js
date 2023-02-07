import md5 from 'md5'
import { api_uploadFile } from '@/apis/utils'
import {
  api_login,
  api_signup,
  api_isExist,
  api_profile,
  api_updateProfile
} from '@/apis/user'

export default {
  namespaced: true,

  state: () => ({
    userProfile: {}
  }),

  mutations: {
    setUserProfile(state, profile) {
      state.userProfile = profile
    }
  },

  actions: {
    // 登陆
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        api_login({
          username,
          password: md5(password)
        })
          .then((data) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 注册
    signup(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        api_signup({
          username,
          password: md5(password)
        })
          .then((data) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 校验是否存在
    checkExist(context, username) {
      return new Promise((resolve, reject) => {
        api_isExist({ username })
          .then((data) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 获取用户信息
    getUserProfile() {
      return new Promise((resolve, reject) => {
        api_profile()
          .then((data) => {
            this.commit('user/setUserProfile', data.userInfo)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 切换用户头像
    changeUserAvatar(context, fileData) {
      return new Promise((resolve, reject) => {
        api_uploadFile(fileData)
          .then((data) => {
            console.log(data)
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // 更新用户信息
    updateUserProfile(context, newProfileData) {
      return new Promise((resolve, reject) => {
        api_updateProfile(newProfileData)
          .then((data) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
