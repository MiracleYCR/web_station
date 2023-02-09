import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rt from 'dayjs/plugin/relativeTime'

import store from '@/store'

export const dateFilter = (val, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

dayjs.extend(rt)

const relativeTime = (val) => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.lang === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

const ellipsis = (val, length) => {
  if (!val) return ''
  if (val.length > length) {
    return val.slice(0, length) + '...'
  }
  return val
}

export const registerFilter = (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    ellipsis,
    relativeTime
  }
}
