import { TAGS_VIEW } from '@/constant'
import { getItem, setItem, removeItem } from '@/utils/storage'
import styleVariables from '@/styles/variable.module.scss'

export default {
  namespaced: true,

  state: () => ({
    sideBarOpened: true,
    styleVariables: styleVariables,
    tagsViewList: getItem(TAGS_VIEW) || []
  }),

  mutations: {
    triggerSideBarOpened(state) {
      state.sideBarOpened = !state.sideBarOpened
    },

    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => item.path === tag.path)
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },

    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },

    /**
     *
     * @param {*} state
     * @param {type: 'other' || 'right' || 'index'} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    },

    resetTagsView(state) {
      state.tagsViewList = []
      removeItem(TAGS_VIEW)
    }
  }
}
