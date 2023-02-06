<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        shape="square"
        :src="$store.getters.userProfile.picture"
      ></el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sideBarOpened">
        {{ $store.getters.userProfile.nickname }}
      </h1>
    </div>
    <el-scrollbar>
      <SideBarMenu />
    </el-scrollbar>
  </div>
</template>

<script setup>
import SideBarMenu from './sideBarMenu.vue'

// logo 的高度
const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 15px;
    color: #ffffff;
    font-weight: 600;
    font-size: 15px;
    white-space: nowrap;
  }
}
</style>
