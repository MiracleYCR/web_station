import md5 from 'md5'
import { api_login, api_signup, api_isExist, api_profile } from '@/apis/user'

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
    },

    async getUserProfile() {
      return new Promise((resolve, reject) => {
        api_profile()
          .then((data) => {
            console.log(data)
            this.commit('user/setUserProfile', data.userInfo)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
