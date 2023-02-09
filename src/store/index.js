import { createStore } from 'vuex'
import getters from './getters'

import app from './modules/app'
import user from './modules/user'
import blog from './modules/blog'

export default createStore({
  getters,
  modules: {
    app,
    user,
    blog
  }
})
