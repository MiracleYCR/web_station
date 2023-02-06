const getters = {
  // 侧边栏展开
  sideBarOpened: (state) => state.app.sideBarOpened,
  // 样式变量
  cssVar: (state) => ({ ...state.app.styleVariables }),
  // tag 标签
  tagsViewList: (state) => state.app.tagsViewList,

  // 用户信息
  userProfile: (state) => state.user.userProfile
}

export default getters
