<template>
  <div class="guide-container">
    <el-tooltip content="功能引导" :auto-close="200">
      <el-icon id="guide-start" @click="onGuide">
        <Guide />
      </el-icon>
      <!-- <SvgIcon id="guide-start" icon="guide" @click="onGuide" /> -->
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

import steps from './config'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

let driver = null

const onGuide = () => {
  driver.defineSteps(steps())
  driver.start()
}

onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一个',
    prevBtnText: '上一个',
    doneBtnText: '完成',
    stageBackground: 'transparent'
  })
})
</script>

<style lang="scss" scoped></style>
