<template>
  <div @click="onTriggerScreenFull">
    <el-icon>
      <FullScreen />
    </el-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { ref, onMounted, onUnmounted } from 'vue'

// 是否全屏
const isFullScreen = ref(false)

const onTriggerScreenFull = () => {
  screenfull.toggle()
}

const change = () => {
  isFullScreen.value = screenfull.isFullscreen
}

onMounted(() => {
  screenfull.on('change', change)
})

onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
