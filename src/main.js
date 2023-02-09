import { createApp } from 'vue'

import store from './store'
import router from './router'

import '@/styles/index.scss'
import installElementPlus from './plugins/element'

import { registerFilter } from '@/utils/globals'

import App from './App.vue'

const app = createApp(App)

// 导入 element-plus
installElementPlus(app)
// 全局注册
registerFilter(app)

app.use(store).use(router).mount('#app')
