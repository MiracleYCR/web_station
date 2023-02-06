<template>
  <div class="navBar-container">
    <!-- 折叠按钮 -->
    <Collapse class="collapse-container" />
    <!-- 面包屑 -->
    <BreadCrumb id="guide-breadcrumb" class="breadcrumb-container" />

    <div class="right-menu">
      <Guide class="right-menu-item hover-effect" />
      <HeaderSearch class="right-menu-item hover-effect" />
      <ScreenFull class="right-menu-item hover-effect" />

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="circle"
            :size="40"
            :src="$store.getters.userProfile.picture"
          ></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item @click="handleProfileSetting">
              <el-icon class="svg-icon"><Setting /></el-icon>
              设置
            </el-dropdown-item>
            <el-dropdown-item divided @click="onLogout">
              <el-icon class="svg-icon"><SwitchButton /></el-icon>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

import Guide from '@/components/guide/index.vue'
import Collapse from '@/components/collapse/index.vue'
import BreadCrumb from '@/components/breadCrumb/index.vue'
import ScreenFull from '@/components/screenFull/index.vue'
import HeaderSearch from '@/components/headerSearch/index.vue'

const router = useRouter()

const handleProfileSetting = () => {
  router.push('/profile/setting')
}
</script>

<style lang="scss" scoped>
.navBar-container {
  width: 100%;
  height: 50px;
  overflow: hidden;
  background-color: #e5eaf3;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .collapse-container {
    height: 100%;
    float: left;
    transition: background 0.5s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    height: 100%;
    display: flex;
    align-items: center;
    float: right;
    padding-right: 20px;

    :deep(.right-menu-item) {
      padding: 0 15px 0 0;
      font-size: 24px;
      color: #5a5e66;
      display: flex;
      align-items: center;
      &.hover-effect {
        cursor: pointer;
      }
    }

    :deep(.avatar-container) {
      cursor: pointer;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        .el-avatar {
          --el-avatar-background-color: none;
        }
      }
    }
  }
}
</style>
