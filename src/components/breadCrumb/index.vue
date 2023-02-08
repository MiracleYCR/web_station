<template>
  <el-breadcrumb class="breadcrumb-wrapper" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        class="breadcrumb-item"
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <div class="no-redirect" v-if="index === breadcrumbData.length - 1">
          {{ item.meta.title }}
        </div>
        <!-- 可点击项 -->
        <div class="redirect" v-else @click="onRedirect(item)">
          {{ item.meta.title }}
        </div>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { useStore } from 'vuex'
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const redirectHoverColor = ref(store.getters.cssVar.menuBg)

const breadcrumbData = ref([])
const getBreadCrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

const onRedirect = (routeInfo) => {
  router.push(routeInfo.path)
}

watch(
  route,
  () => {
    getBreadCrumbData()
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  height: 100%;
  display: inline-flex;
  font-size: 13px;
  align-items: center;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
    margin-top: 1px;

    &:hover {
      cursor: pointer;
      color: v-bind(redirectHoverColor);
    }
  }

  :deep(.no-redirect) {
    margin-top: 1px;
    color: #97a8be;
    cursor: text;
  }

  :deep(.el-breadcrumb__separator) {
    margin-top: 1px;
  }
}
</style>
