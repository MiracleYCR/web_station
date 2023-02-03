<template>
  <div class="app-main">
    <div class="app-wrapper">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'

const store = useStore()
const route = useRoute()

watch(
  route,
  (to) => {
    // 不是所有的路由都需要保存
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    console.log(fullPath, meta, name, params, path, query)
    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: !route.meta
        ? route.path.split('/')[route.path.split('/').length - 1]
        : route.meta.title
    })
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: calc(100vh - 40px);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 115px 20px 15px 20px;

  .app-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-right: 10px;
    box-sizing: border-box;
  }
}
</style>
