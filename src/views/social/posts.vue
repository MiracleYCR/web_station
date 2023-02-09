<template>
  <div class="social-posts-container">
    <div class="left">
      <el-card class="post">
        <template #header>
          <div class="post-header">
            <span>微博标题</span>
            <el-input
              class="title"
              placeholder="请输入标题"
              v-model="blogTitle"
            ></el-input>
            <el-button class="post-btn" type="info" @click="savePostContent">
              保存
            </el-button>
            <el-button class="post-btn" type="success" @click="postBlog">
              发布
            </el-button>
          </div>
        </template>
        <div class="post-content">
          <Editor ref="postEditorRef" :content="postContent" />
        </div>
      </el-card>
    </div>
    <div class="right">
      <el-card class="profile">
        <div class="header">
          <el-avatar
            fit="cover"
            shape="circle"
            :size="70"
            :src="`http://localhost:3000${$store.getters.userProfile.picture}`"
          />
          <div class="userInfo">
            <span class="nickname">
              {{ $store.getters.userProfile.nickname }}
            </span>
            <div class="baseInfo">
              <el-tag effect="light">
                <div style="display: flex; align-items: center">
                  <el-icon><LocationFilled /></el-icon>
                  <span style="margin: 2px 0 0 3px">
                    {{ $store.getters.userProfile.city }}
                  </span>
                </div>
              </el-tag>

              <el-tag type="warning" style="margin-left: 10px">
                <div style="display: flex; align-items: center">
                  <el-icon><Avatar /></el-icon>
                  <span style="margin: 2px 0 0 3px">
                    {{
                      $store.getters.userProfile.gender === 1
                        ? '男'
                        : $store.getters.userProfile.gender === 2
                        ? '女'
                        : '保密'
                    }}
                  </span>
                </div>
              </el-tag>
            </div>
          </div>
        </div>

        <div class="fans">
          <div class="fans-header">
            <el-icon color="#409eff"><UserFilled /></el-icon>
            <span>粉丝</span>
          </div>
          <div class="fans-list">
            <el-avatar
              fit="cover"
              shape="circle"
              :size="40"
              :src="`http://localhost:3000${$store.getters.userProfile.picture}`"
            />
            <el-avatar
              fit="cover"
              shape="circle"
              :size="40"
              :src="`http://localhost:3000${$store.getters.userProfile.picture}`"
            />
          </div>
        </div>

        <div class="focus">
          <div class="focus-header">
            <el-icon color="#e6a23c"><UserFilled /></el-icon>
            <span>关注</span>
          </div>
          <div class="focus-list">
            <el-avatar
              fit="cover"
              shape="circle"
              :size="40"
              :src="`http://localhost:3000${$store.getters.userProfile.picture}`"
            />
            <el-avatar
              fit="cover"
              shape="circle"
              :size="40"
              :src="`http://localhost:3000${$store.getters.userProfile.picture}`"
            />
          </div>
        </div>

        <div class="comment">
          <div class="comment-header">
            <el-icon color="#67c23a"><Comment /></el-icon>
            <span>@提到我</span>
          </div>
          <div class="comment-list"></div>
        </div>
      </el-card>
      <el-card class="message"> </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import Editor from '@/components/editor/index.vue'

const store = useStore()

const blogTitle = ref('')

const postContent = ref('')
const postEditorRef = ref(null)

// 保存微博内容
const savePostContent = () => {
  console.log('savePostContent')
}

const postBlog = () => {
  store.dispatch('blog/createBlog', {
    title: blogTitle.value,
    content: postEditorRef.value.getContent()
  })
}
</script>

<style lang="scss" scoped>
@mixin profile-item-header($height) {
  height: $height;
  display: flex;
  align-items: center;
  span {
    color: #666666;
    font-size: 14px;
    margin-left: 5px;
  }
}

@mixin profile-item-list {
  flex: 1;
  display: flex;
  align-items: flex-end;
}

.social-posts-container {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    width: 70%;
    height: 100%;
    .post {
      height: 100%;
      display: flex;
      flex-direction: column;

      :deep(.el-card__header) {
        padding: 5px 20px;
      }

      :deep(.el-card__body) {
        flex: 1;
      }

      .post-header {
        height: 50px;
        display: flex;
        align-items: center;
        position: relative;

        .title {
          margin-left: 20px;
          max-width: 600px;
        }

        .post-btn {
          margin-left: 20px;
        }
      }
      .post-content {
        height: 100%;
      }
    }
  }
  .right {
    flex: 1;
    height: 100%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;

    .profile {
      height: 45%;

      :deep(.el-card__body) {
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .header {
        display: flex;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        margin-bottom: 25px;
        .userInfo {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 20px;
          .nickname {
            font-size: 22px;
            font-weight: bold;
          }
          .baseInfo {
            display: flex;
            align-items: center;
            margin-top: 8px;
          }
        }
      }
      .fans {
        height: 75px;
        display: flex;
        flex-direction: column;
        .fans-header {
          @include profile-item-header(20px);
        }
        .fans-list {
          @include profile-item-list;
        }
      }
      .focus {
        height: 75px;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        .focus-header {
          @include profile-item-header(20px);
        }
        .focus-list {
          @include profile-item-list;
        }
      }
      .comment {
        flex: 1;
        margin-top: 15px;
        .comment-header {
          @include profile-item-header(100%);
        }
      }
    }
    .message {
      flex: 1;
      margin-top: 20px;
    }
  }

  :deep(.el-input__wrapper) {
    border: 1px solid #e4e7ed;
  }
}
</style>
