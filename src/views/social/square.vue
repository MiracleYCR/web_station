<template>
  <div class="social-square-container">
    <el-card v-loading="loading">
      <div class="square-header">
        <el-tabs class="title" v-model="squareType">
          <el-tab-pane label="微博大厅" name="all"> </el-tab-pane>
          <el-tab-pane label="个人主页" name="personal"> </el-tab-pane>
        </el-tabs>
      </div>
      <div class="square-content">
        <el-card
          class="blog-item"
          v-for="(item, index) in blogData.list"
          :key="index"
        >
          <template #header>
            <div class="blog-item-header">
              <el-avatar
                :size="50"
                :src="`http://localhost:3000${item.user.picture}`"
              ></el-avatar>
              <div class="blog-info">
                <span class="nickname">{{ item.user.nickname }}</span>
                <div class="time">
                  <span>
                    创建时间: {{ $filters.dateFilter(item.createdAt) }}
                  </span>
                  <span>
                    修改时间: {{ $filters.dateFilter(item.updatedAt) }}
                  </span>
                </div>
              </div>
            </div>
          </template>
          <h3 class="blog-item-title">{{ item.title }}</h3>
          <el-divider />
          <div class="blog-item-content">
            <div>
              <div v-html="$filters.ellipsis(item.content, 100)"></div>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const blogData = ref({})
const squareType = ref('personal')

const loading = ref(false)

watch(
  squareType,
  (val) => {
    loading.value = true
    store
      .dispatch('blog/queryBlog', { type: val, params: {} })
      .then((resp) => {
        blogData.value = resp
        loading.value = false
      })
      .catch(() => {})
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.social-square-container {
  width: 100%;
  height: 100%;

  .square-header {
    box-sizing: border-box;
    padding: 0 10px;
    .title {
      display: inline-block;
    }
  }

  .square-content {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 15px 15px 0 15px;

    .blog-item {
      float: left;
      width: 23%;
      height: 300px;
      margin-right: 2%;
      margin-bottom: 2%;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
      }

      :deep(.el-card__header) {
        background: linear-gradient(to right, #0ea5e9, #6366f1);
      }

      :deep(.el-card__body) {
        padding: 15px;
      }

      .blog-item-header {
        display: flex;
        align-items: center;
      }

      .blog-info {
        flex: 1;
        margin-left: 10px;
        .nickname {
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
        }
        .time {
          display: flex;
          font-size: 11px;
          color: #ffffff;
          flex-direction: column;
        }
      }

      .blog-item-title {
        height: 50px;
        line-height: 50px;
      }
      :deep(.el-divider) {
        margin: 10px 0 5px 0;
      }
      .blog-item-content {
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;
      }
    }
  }

  :deep(.el-card) {
    height: 100%;
    display: flex;
    flex-direction: column;
    .el-card__body {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  }
}
</style>
