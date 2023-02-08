<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

watch(
  () => router.path,
  (n, o) => {
    if (n) {
      console.log('1')
      n !== '/login' && store.dispatch('user/getUserProfile')
    } else {
      console.log('1')
      o !== '/login' && store.dispatch('user/getUserProfile')
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
