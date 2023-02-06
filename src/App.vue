<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

store.dispatch('user/getUserProfile')
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
