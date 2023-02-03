import md5 from 'md5'
import { api_login, api_signup, api_isExist } from '@/apis/user'

export default {
  namespaced: true,

  state: () => ({
    userInfo: {}
  }),

  mutations: {},

  actions: {
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
    }
  }
}
