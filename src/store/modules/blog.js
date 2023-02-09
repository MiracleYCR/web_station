import { api_createBlog, api_queryBlog } from '@/apis/blog'

export default {
  namespaced: true,

  state: () => ({}),

  mutations: {},

  actions: {
    createBlog(context, blogData) {
      return new Promise((resolve, reject) => {
        api_createBlog(blogData)
          .then(() => {
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    queryBlog(context, { type, params }) {
      return new Promise((resolve, reject) => {
        api_queryBlog(type, params)
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
