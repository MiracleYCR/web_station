<template>
  <!-- 支持渲染多级 menu 菜单 -->
  <el-sub-menu v-if="route.children.length > 0" :index="route.path">
    <template #title>
      <el-icon class="svg-icon">
        <component :is="route.meta.icon"></component>
      </el-icon>
      <span class="web-station-menu-title">{{ route.meta.title }}</span>
    </template>
    <!-- 循环渲染 -->
    <sideBarItem
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sideBarItem>
  </el-sub-menu>
  <!-- 渲染 item 项 -->
  <el-menu-item v-else :index="route.path">
    <el-icon class="svg-icon">
      <component :is="route.meta.icon"></component>
    </el-icon>
    <span class="web-station-menu-title">{{ route.meta.title }}</span>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'

// 定义 props
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.web-station-menu-title {
  box-sizing: border-box;
  padding-top: 3px;
}
</style>
