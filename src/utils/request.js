import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { code, data } = response.data

    if (code === 200) {
      if (data.errno === 0) {
        ElMessage.success(data.message)
      }
      if (data.errno && data.errno !== 0) {
        ElMessage.error(data.message)
      }
      return data
    } else {
      ElMessage.error(data.message)
      return Promise.reject(new Error(data.message))
    }
  },
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
