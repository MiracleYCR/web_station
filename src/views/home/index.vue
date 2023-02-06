<template>
  <div class="home-container">
    <el-button @click="test">测试用户 session </el-button>
    <el-card>
      <div>dsadsadsa</div>
    </el-card>
  </div>
</template>

<script setup>
import request from '@/utils/request'
const test = () => {
  request({
    url: '/user/profile'
  })
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
}
</style>
