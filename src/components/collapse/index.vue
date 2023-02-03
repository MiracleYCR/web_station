<template>
  <div class="collapse-wrapper" @click="onTriggerCollapse">
    <el-icon class="collapse-icon svg-icon">
      <Fold v-show="store.getters.sideBarOpened" />
      <Expand v-show="!store.getters.sideBarOpened" />
    </el-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
const onTriggerCollapse = () => {
  store.commit('app/triggerSideBarOpened')
}
</script>

<style lang="scss" scoped>
.collapse-wrapper {
  padding: 0 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  .collapse-icon {
    font-size: 20px;
  }
}
</style>
